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
	if (filePath.endsWith('.svelte') || filePath.endsWith('.ts') || filePath.endsWith('.js')) {
		let content = fs.readFileSync(filePath, 'utf8');
		let original = content;

		// Replace '$lib/utils/quirky.js' -> '$lib/utils/quirky'
		content = content.replace(/from\s+['"]([^'"]+)\.js['"]/g, "from '$1'");
		
		if (content !== original) {
			fs.writeFileSync(filePath, content, 'utf8');
			console.log(`Removed .js extension from imports in ${filePath}`);
		}
	}
}

walkDir('./src', processFile);
