const fs = require('node:fs');
const { readdir } = require('fs/promises');
const path = require('node:path');

const writeStream = fs.createWriteStream( path.join(__dirname, 'project-dist/bundle.css'), 'utf-8');
const filePath = path.join(__dirname, 'styles');

async function filesInFolder () {
    try {
        const files = await readdir(filePath, {withFileTypes: true});
        for (const file of files) {
            const filesInStyleFile = path.join(__dirname, 'styles', file.name);
            const fileExtension = path.extname(filesInStyleFile);
            if (file.isFile() && fileExtension === '.css'){
            const writeStreamCss = fs.createReadStream(filesInStyleFile);
            writeStreamCss.on('data', data => writeStream.write(data));
         }
        }
    } catch (err) {
        console.error(err);
    }
}
filesInFolder ()


