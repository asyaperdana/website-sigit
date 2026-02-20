import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
	fs.readdirSync(dir).forEach((f) => {
		let dirPath = path.join(dir, f);
		let isDirectory = fs.statSync(dirPath).isDirectory();
		isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
	});
}

walkDir('./src/lib/components', function (filePath) {
	if (filePath.endsWith('.svelte')) {
		let content = fs.readFileSync(filePath, 'utf8');

		if (content.includes('class=') && content.includes('reveal') && !content.includes('use:reveal')) {
			// Add use:reveal to elements that have reveal in their class attribute
			content = content.replace(/(<(?!\/)[a-zA-Z0-9]+[^>]*class="[^"]*\breveal\b[^"]*"[^>]*?)(\/?>)/g, (match, p1, p2) => {
				// Don't add use:reveal if it already exists
				if (match.includes('use:reveal')) return match;
				return `${p1} use:reveal${p2}`;
			});

			// If script exists, add import. If not, create script block
			const importStr = `import { reveal } from '$lib/actions/reveal';`;
			if (!content.includes(importStr)) {
				if (content.match(/<script[^>]*>/)) {
					content = content.replace(/(<script[^>]*>\s*)/, `$1${importStr}\n\t`);
				} else {
					content = `<script lang="ts">\n\t${importStr}\n</script>\n\n` + content;
				}
			}

			// Also upgrade script tags to lang="ts"
			content = content.replace(/<script>/g, '<script lang="ts">');

			fs.writeFileSync(filePath, content, 'utf8');
			console.log(`Updated ${filePath}`);
		} else {
            // Also upgrade script tags to lang="ts" if they don't have reveal
            if (content.includes('<script>')) {
                content = content.replace(/<script>/g, '<script lang="ts">');
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Upgraded to TS: ${filePath}`);
            }
        }
	}
});
