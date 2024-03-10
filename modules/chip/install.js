import { appendFile, createModules, installModule } from '../../installer.js';

export function init(projectConfig) {
  const moduleName = 'chip';
  const { destinationPath } = createModules(projectConfig);
  const requiredDefaultFiles = ['/config/colors.scss', '/config/borders.scss', '/helper/text.scss'];
  
  // Install module
  const moduleInstalled = installModule(moduleName, projectConfig, { requiredDefaultFiles });
  
  // Check if it's first install
  if (moduleInstalled) {
    // Setup files to update
    const indexFile = '/_index.scss';
    const destinationIndexPath = destinationPath + indexFile;

    // Import files into _index.scss
    const newsImportPart = [
      '// chip module',
      '@use "./component/chip.scss";',
    ].join("\n");
    appendFile(destinationIndexPath, newsImportPart);
  }
}