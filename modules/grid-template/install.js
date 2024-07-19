import path from 'path';
import { appendFile, createModules, installModule } from '../../installer.js';

export function init(projectConfig) {
  const moduleName = 'grid-template';
  const { destinationPath } = createModules(projectConfig);
  const requiredDefaultFiles = ['/configs/spaces.scss', '/configs/mq.scss'];
  
  // install module
  const moduleInstalled = installModule(moduleName, projectConfig, { requiredDefaultFiles });
  
  
  // Check if it's first install
  if (moduleInstalled) {
    // Setup files to update
    const indexFile = '/_index.scss';
    const destinationIndexPath = path.resolve(destinationPath, `.${indexFile}`);
    
    // Import files into _index.scss
    const newsImportPart = [
      '// grid-template module',
      '@use "./helpers/gridTemplate.scss";',
    ].join("\n");
    appendFile(destinationIndexPath, newsImportPart);
  }
}