const fs = require('fs-extra');

const sourcePath = './';
const sourceFolders = ['componant', 'config', 'helper', 'utilities'];
// TODO JORDAN : read this in config file.
const destinationPath = '../../src/styles/';

// Check if destination path exist
if (!fs.existsSync(destinationPath)) {
  // Create destination path
  fs.mkdirSync(destinationPath);
}

function copyFiles(source, destination) {
  const files = fs.readdirSync(source);
  
  files.forEach(file => {
    const sourceFilePath = `${source}/${file}`;
    const destinationFilePath = `${destination}/${file}`;
    
    // Check if file already exists
    if (!fs.existsSync(destinationFilePath)) {
      // Copy file
      fs.copySync(sourceFilePath, destinationFilePath);
      console.log(`\x1b[32m ${sourceFilePath} created ! \x1b[0m`);
    } else {
      console.log(`\x1b[33m ${destinationFilePath} already exists... Skiped. \x1b[0m`);
    }
  });
}

sourceFolders.forEach(folder => {
  copyFiles(`${sourcePath}${folder}`, `${destinationPath}${folder}`);
});
fs.copySync(`${sourcePath}_index.scss`, `${destinationPath}_index.scss`);