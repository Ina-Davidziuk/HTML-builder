const fs = require('fs');
const path = require('path');
const { stdout } = process;

const readStrem = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readStrem.on('data', text => stdout.write(text));