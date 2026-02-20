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
	if (filePath.endsWith('.svelte')) {
		let content = fs.readFileSync(filePath, 'utf8');
		let original = content;

		// Replace variable /* ts: type */ with variable: type
		// Only for variables in let or params: e.g. let tooltips /* ts: any */ -> let tooltips: any
		content = content.replace(/let\s+([a-zA-Z0-9_]+)\s*\/\*\s*ts:\s*([^*]+)\s*\*\//g, 'let $1: $2');
		
		// For params like (counter /* ts: any */)
		content = content.replace(/\(\s*([a-zA-Z0-9_]+)\s*\/\*\s*ts:\s*([^*]+)\s*\*\//g, '($1: $2');
		
		if (content !== original) {
			fs.writeFileSync(filePath, content, 'utf8');
			console.log(`Fixed TS types in ${filePath}`);
		}
	}
}

walkDir('./src/lib/components', processFile);
walkDir('./src/routes', processFile);
