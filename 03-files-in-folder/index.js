const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(__dirname, 'secret-folder');

async function filesInFolder () {
    try {
        const files = await fs.readdir(filePath, {withFileTypes: true});
        for (const file of files) {
            if (file.isFile()){
                const filesInSecretFile = path.join(__dirname, 'secret-folder', file.name);
                const fileExtension = path.extname(filesInSecretFile);
                const fileName = path.basename(filesInSecretFile);
                let fileSize = fs.stat(filesInSecretFile);
                console.log(`${fileName.slice(0, fileName.lastIndexOf(fileExtension))}-${fileExtension.replace('.', '')}-${((await fileSize).size/1024).toFixed(3)}kb`);
            }
        }
    } catch (err) {
        console.error(err);
    }
}
filesInFolder ()