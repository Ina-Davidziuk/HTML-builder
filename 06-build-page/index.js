const fs = require('node:fs');
const { mkdir, copyFile, rm, readdir, readFile, writeFile} = require('fs/promises');
const path = require('node:path');


const distFolder = path.join(__dirname, 'project-dist');

const temlatePath = path.join(__dirname, 'template.html');

const htmlDirPath = path.join(__dirname, 'project-dist', 'index.html');

const componetsPath = path.join(__dirname, 'components');

const assetsDirPath = path.join(__dirname, 'project-dist', 'assets');
const stylesDirPath = path.join(__dirname, 'project-dist', 'style.css');

const assetsPath = path.join(__dirname, 'assets');
const stylesPath = path.join(__dirname, 'styles');
const writeStyleStream = fs.createWriteStream(stylesDirPath, 'utf-8');


//Создаём папку project-dist.
async function createDir() {
    await mkdir(distFolder, { recursive: true }, err => {
        if(err){
        console.error(err);
        }
        console.log('The folder created sucсessfully');
    });
}
createDir()

//Замена шаблонных тегов содержимым файлов-компонентов и запись изменённого шаблона в файл index.html в папке project-dist
async function  buildHtml () {
let readTemplate = await readFile(temlatePath, 'utf-8');
let regExp = new RegExp(/\{\{(.+)\}\}/g);
const newFile = readTemplate.match(regExp).map(async (matchEl) => {
let fileElement = `${matchEl.replace(/[{{}}]/g, '')}.html`

const filesInComponents = path.join(__dirname, 'components', fileElement);
const readfilesInComponents = await readFile(filesInComponents, 'utf-8');
readTemplate = readTemplate.replace(matchEl, readfilesInComponents);
    })
await Promise.all(newFile);
await writeFile(htmlDirPath, readTemplate);

}
            
buildHtml ()

//создания файла style.css
async function createStyles () {
        const files = await readdir(stylesPath, {withFileTypes: true});
        for (const file of files) {
            const filesInStyleFile = path.join(__dirname, 'styles', file.name);
            const fileExtension = path.extname(filesInStyleFile);
            if (file.isFile() && fileExtension === '.css'){
            const writeStreamCss = fs.createReadStream(filesInStyleFile);
            writeStreamCss.on('data', data => writeStyleStream.write(data));
        }
    }
}
createStyles ()

//перенос папки assets в папку project-dist
async function copyAssetsDir (oldFolder, newFolder) {
    await rm (newFolder, {force: true, recursive: true, maxRetries: 100});
    await mkdir(newFolder, { recursive: true }, err => {
        if(err){
        console.error(err);
        }
    });
    const files = await readdir(oldFolder, {withFileTypes: true});
    for (const file of files) {
        const filesInOldFolder = path.join(oldFolder, file.name);
            const fileInNewFolder = path.join(newFolder, file.name);
        if(file.isFile()) {
            await copyFile(filesInOldFolder, fileInNewFolder);
        }
        if(file.isDirectory()){
            copyAssetsDir (filesInOldFolder, fileInNewFolder);
        }
            
    }
}
copyAssetsDir (assetsPath, assetsDirPath)