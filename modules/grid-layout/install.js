import { appendFile, createModules, installModule } from '../../installer.js';

export function init(projectConfig) {
  const moduleName = 'grid-layout';
  const { destinationPath } = createModules(projectConfig);
  const requiredDefaultFiles = ['/config/layout.scss', '/config/mq.scss'];

  // install module
  const moduleInstalled = installModule(moduleName, projectConfig, { requiredDefaultFiles });
  
  
  // Check if it's first install
  if (moduleInstalled) {
    // Setup files to update
    const indexFile = '/_index.scss';
    const configLayoutFile = '/config/layout.scss';
    const destinationConfigLayoutPath = destinationPath + configLayoutFile;
    const destinationIndexPath = destinationPath + indexFile;

    // Add news variables in layout config
    const newsConfigLines = [
      '// grid-layout module',
      '$margin: 0;',
      '$desktop-margin: 0;',
    ].join("\n");
    appendFile(destinationConfigLayoutPath, newsConfigLines);
    
    // Import files into _index.scss
    const newsImportPart = [
      '// grid-layout module',
      '@use "./component/grid-layout.scss";',
    ].join("\n");
    appendFile(destinationIndexPath, newsImportPart);
  }
}