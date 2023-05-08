const fs = require('node:fs/promises');
const { mkdir, copyFile, rm} = require('fs/promises');
const path = require('node:path');


const filesPath = path.join(__dirname, 'files');
const filesCopyPath = path.join(__dirname, 'files-copy');

async function copyDir () {
        await rm (filesCopyPath, {force: true, recursive: true, maxRetries: 100})
            await  mkdir(filesCopyPath, { recursive: true }, err => {
                if(err){
                console.error(err);
                }
                })
                console.log('The folder is coppy sucsessfully')
        const files = await fs.readdir(filesPath, {withFileTypes: true});
        for (const file of files) {
            const filesInOldFolder = path.join(__dirname, 'files', file.name);
            const fileInNewFolder = path.join(__dirname, 'files-copy', file.name);
        await copyFile(filesInOldFolder, fileInNewFolder );
        }
        
}
copyDir ()