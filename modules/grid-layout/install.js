import path from 'path';
import { appendFile, createModules, installModule } from '../../installer.js';

export function init(projectConfig) {
  const moduleName = 'grid-layout';
  const { destinationPath } = createModules(projectConfig);
  const requiredDefaultFiles = ['/configs/layout.scss', '/configs/mq.scss'];
  
  // install module
  const moduleInstalled = installModule(moduleName, projectConfig, { requiredDefaultFiles });
  
  
  // Check if it's first install
  if (moduleInstalled) {
    // Setup files to update
    const indexFile = '/_index.scss';
    const configLayoutFile = '/configs/layout.scss';
    const destinationConfigLayoutPath = path.resolve(destinationPath, `.${configLayoutFile}`);
    const destinationIndexPath = path.resolve(destinationPath, `.${indexFile}`);

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
      '@use "./components/gridLayout.scss";',
    ].join("\n");
    appendFile(destinationIndexPath, newsImportPart);
  }
}