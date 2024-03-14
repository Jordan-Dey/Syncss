import path from 'path';
import fs from 'fs-extra';
import { loadJsonFile, copyFile, copyFolder } from './installer.js';

const sourcePath = path.resolve('.');
const projectPath = path.resolve(sourcePath, '../..');
const projectConfig = loadJsonFile(path.resolve(projectPath, './syncss.json'));
const sourceFolders = ['component', 'config', 'helper', 'utilities'];
const stylesFolderPath = projectConfig?.installPath || "/src/styles";
const destinationPath = path.resolve(projectPath, `.${stylesFolderPath}`);

console.log(`Syncss core install :`);

// Check if destination path exist
if (!fs.existsSync(destinationPath)) {
  // Create destination path
  fs.mkdirSync(destinationPath, {recursive: true});
}

// Copy each source folder to project directory
sourceFolders.forEach(folder => {
  const sourceFolder = path.resolve(sourcePath, `./${folder}`);
  const destinationFolder = path.resolve(destinationPath, `./${folder}`);
  const options = { excludeFiles: projectConfig?.excludeFiles?.map((excludeFile) => {
    return path.resolve(sourcePath, `.${excludeFile}`);
  }) };
  copyFolder(sourceFolder, destinationFolder, options);
});

// Copy _index.scss to project directory
const indexSourcePath = path.resolve(sourcePath, `./_index.scss`);
const indexDestinationPath = path.resolve(destinationPath, `./_index.scss`);
copyFile(indexSourcePath, indexDestinationPath);

// Install modules
const modulesConfig = projectConfig?.modules;
if (modulesConfig?.length) {
  console.log(`Syncss module install :`);

  const modulesFolder = path.resolve(sourcePath, `./modules`);

  for (const moduleName of modulesConfig) {
    const modulePath = path.resolve(modulesFolder, `./${moduleName}`);
    if (!fs.existsSync(modulePath)) {
      console.log(`\x1b[33m Skipped : ${moduleName} does not exist... \x1b[0m`);
      continue;
    }

    console.log(`${moduleName} install :`);

    const moduleInstaller = await import(`./modules/${moduleName}/install.js`);
    moduleInstaller.init(projectConfig);

    console.log(`${moduleName} module installed !`);
  }
}

console.log(`-------------------------`);
console.log(`✨ Syncss installed ! ✨`);
console.log(`-------------------------`);