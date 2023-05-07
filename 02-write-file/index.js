const { stdin, stdout, exit } = require('node:process');
const fs = require('fs');
const path = require('path');

const writeStream = fs.createWriteStream( path.join(__dirname, 'text.txt'));

stdout.write('Привет!Введите текст:\n');
stdin.on('data', data => {
    if (data.includes('exit')){
        stdout.write('Удачи!');
        exit();
    }
    writeStream.write(data);
    });

    process.on('SIGINT', () => {
        stdout.write('\nУдачи!');
        exit();
    });
    