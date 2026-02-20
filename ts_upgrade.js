import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
	fs.readdirSync(dir).forEach((f) => {
		let dirPath = path.join(dir, f);
		let isDirectory = fs.statSync(dirPath).isDirectory();
		isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
	});
}

function processFile(filePath) {
	let content = fs.readFileSync(filePath, 'utf8');
	let original = content;

	// Example: /** @type {HTMLElement} */ (e.target) -> (e.target as HTMLElement)
	content = content.replace(/\/\*\*\s*@type\s*\{\s*([^}]+)\s*\}\s*\*\/\s*\(([^)]+)\)/g, '($2 as $1)');
	
	// Example: /** @type {any} */ p -> (p: any)
	content = content.replace(/\/\*\*\s*@type\s*\{\s*([^}]+)\s*\}\s*\*\/\s*([a-zA-Z0-9_]+)/g, '$2 /* ts: $1 */');

	// Example: onOpenModal={(/** @type {any} */ p) => (activeProject = p)} -> onOpenModal={(p: any) => (activeProject = p)}
	content = content.replace(/\(\/\*\*\s*@type\s*\{\s*([^}]+)\s*\}\s*\*\/\s*([a-zA-Z0-9_]+)\)/g, '($2: $1)');

	// Example:
	// /** @param {MouseEvent} e */
	// function handleStartExploring(e) { -> function handleStartExploring(e: MouseEvent) {
	content = content.replace(/\/\*\*\s*@param\s*\{\s*([^}]+)\s*\}\s*([a-zA-Z0-9_]+)\s*\*\/\s*\n\s*(?:export\s+)?function\s+([a-zA-Z0-9_]+)\((.*?)\)/g, (match, type, param, funcName, args) => {
		let newArgs = args.replace(new RegExp(`\\b${param}\\b`), `${param}: ${type}`);
		return `function ${funcName}(${newArgs})`;
	});

	// For arrow functions or standard handlers that we missed
	content = content.replace(/\/\*\*\s*@param\s*\{\s*([^}]+)\s*\}\s*([a-zA-Z0-9_]+)\s*\*\/\s*\n\s*const\s+([a-zA-Z0-9_]+)\s*=\s*\((.*?)\)\s*=>/g, (match, type, param, funcName, args) => {
		let newArgs = args.replace(new RegExp(`\\b${param}\\b`), `${param}: ${type}`);
		return `const ${funcName} = (${newArgs}) =>`;
	});

	if (content !== original) {
		fs.writeFileSync(filePath, content, 'utf8');
		console.log(`Upgraded JSDoc -> TS in ${filePath}`);
	}
}

walkDir('./src/lib/components', processFile);
walkDir('./src/routes', processFile);
