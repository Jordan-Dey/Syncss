import fs from 'fs-extra';

export function copyFile(source, destination) {
  // Check if file already exists
  if (fs.existsSync(destination)) {
    console.log(`\x1b[33m Skipped : ${destination} already exists... \x1b[0m`);
    return false;
  }

  // Copy file
  fs.copySync(source, destination);
  console.log(`\x1b[32m Created : ${destination} \x1b[0m`);
  return true;
}

export function copyFiles(source, destination, files, options = undefined) {
  // return true if all files has been copied
  return files.map(file => {
    const sourceFilePath = `${source}/${file}`;
    const destinationFilePath = `${destination}/${file}`;

    if (options?.excludeFiles?.includes(`${sourceFilePath}`)) {
      console.log(`\x1b[33m Skipped : ${destinationFilePath} has been excluded by config... \x1b[0m`);
      return false;
    }

    return copyFile(sourceFilePath, destinationFilePath);
  }).reduce((filesResult, fileResult) => { return filesResult && fileResult }, true);
}

export function copyFolder(source, destination, options = undefined) {
  const files = fs.readdirSync(source);
  return copyFiles(source, destination, files, options);
}

export function appendFile(filePath, text) {
  fs.appendFile(filePath, `\n${text}\n`, (err) => {
    if (err) throw err;
  });
  console.log(`\x1b[32m Update : ${filePath} \x1b[0m`);
}

export function getDirectories(path) {
  try {
    const files = fs.readdirSync(path);
    const directories = files.filter(file => fs.statSync(`${path}/${file}`).isDirectory());
    return directories;
  } catch (err) {
    throw err;
  }
}

export function loadJsonFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return false;
    }
    
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const jsonObject = JSON.parse(jsonData);
    return jsonObject;
  } catch (err) {
    throw err;
  }
}

export function createModules(projectConfig) {
  const projectPath = '../..';
  const stylesFolderPath = projectConfig?.installPath || "/src/styles";
  const destinationPath = `${projectPath}${ stylesFolderPath }`;

  return { projectPath, stylesFolderPath, destinationPath };
}

export function installModule(moduleName, projectConfig, options = {}) {
  const sourcePath = '.';
  const modulePath = `${sourcePath}/modules/${moduleName}`;
  const projectPath = '../..';
  const stylesFolderPath = projectConfig?.installPath || "/src/styles";
  const destinationPath = `${projectPath}${ stylesFolderPath }`;

  if (options.requiredDefaultFiles) {
    // Copy required files
    options.requiredDefaultFiles.forEach((requiredFile) => {
      const sourceFilePath = sourcePath + requiredFile;
      const destinationFilePath = destinationPath + requiredFile;
  
      // Check if required file exists in destination project and create it if not
      copyFile(sourceFilePath, destinationFilePath);
    });
  }
  
  // Load directories list in module
  const moduleFolders = getDirectories(modulePath);
  
  // Copy each source folder to project directory
  return moduleFolders.map(folder => {
    const moduleFolder = `${modulePath}/${folder}`;
    const destinationFolder = `${destinationPath}/${folder}`;
    return copyFolder(moduleFolder, destinationFolder);
  }).reduce((foldersResult, folderResult) => { return foldersResult && folderResult }, true);
}