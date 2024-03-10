import fs from 'fs-extra';
import { loadJsonFile, copyFile, copyFolder } from './installer.js';

const sourcePath = '.';
const projectPath = '../..';
const projectConfig = loadJsonFile(`${projectPath}/syncss.json`);
const sourceFolders = ['component', 'config', 'helper', 'utilities'];
const stylesFolderPath = projectConfig?.installPath || "/src/styles";
const destinationPath = `${projectPath}${ stylesFolderPath }`;

console.log(`Syncss core install :`);

// Check if destination path exist
if (!fs.existsSync(destinationPath)) {
  // Create destination path
  fs.mkdirSync(destinationPath, {recursive: true});
}

// Copy each source folder to project directory
sourceFolders.forEach(folder => {
  const sourceFolder = `${sourcePath}/${folder}`;
  const destinationFolder = `${destinationPath}/${folder}`;
  const options = { excludeFiles: projectConfig?.excludeFiles?.map((excludeFile) => {
    return `${sourcePath}${excludeFile}`
  }) };
  copyFolder(sourceFolder, destinationFolder, options);
});

// Copy _index.scss to project directory
copyFile(`${sourcePath}/_index.scss`, `${destinationPath}/_index.scss`);

// Install modules
const modulesConfig = projectConfig?.modules;
if (modulesConfig?.length) {
  console.log(`Syncss module install :`);

  const modulesFolder = `${sourcePath}/modules`;

  for (const moduleName of modulesConfig) {
    const modulePath = `${modulesFolder}/${moduleName}`;
    if (!fs.existsSync(modulePath)) {
      console.log(`\x1b[33m Skipped : ${modulePath} does not exist... \x1b[0m`);
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