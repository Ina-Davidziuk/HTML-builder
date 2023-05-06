const fs = require('fs');
const path = require('path');
const { stdout } = process;

const readStrem = fs.createReadStream(path.join(__dirname, 'text.txt'));
readStrem.on('data', (text) => stdout.write(text.toString()));