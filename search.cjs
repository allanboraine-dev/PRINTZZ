const fs = require('fs');
const path = require('path');

function searchFilesInDirectory(dir, filter, ext) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filename = path.join(dir, file);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            searchFilesInDirectory(filename, filter, ext);
        } else if (filename.endsWith(ext)) {
            const content = fs.readFileSync(filename, 'utf-8');
            if (content.includes(filter)) {
                console.log(`Found in: ${filename}`);
                const lines = content.split('\n');
                lines.forEach((line, i) => {
                    if (line.includes(filter)) {
                        console.log(`Line ${i + 1}: ${line.trim()}`);
                    }
                });
            }
        }
    }
}

searchFilesInDirectory('./src', 'process.env', '.tsx');
searchFilesInDirectory('./src', 'process.env', '.ts');
