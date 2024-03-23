import path from 'path';
import { appendFile, createModules, installModule } from '../../installer.js';

export function init(projectConfig) {
  const moduleName = 'shadow';
  const { destinationPath } = createModules(projectConfig);
  const requiredDefaultFiles = ['/configs/colors.scss', '/configs/mq.scss'];

  // Install module
  const moduleInstalled = installModule(moduleName, projectConfig, { requiredDefaultFiles });
  
  // Check if it's first install
  if (moduleInstalled) {
    // Setup files to update
    const indexFile = '/_index.scss';
    const destinationIndexPath = path.resolve(destinationPath, `.${indexFile}`);

    // Import files into _index.scss
    const newsImportPart = [
      '// shadow module',
      '@use "./helpers/shadow.scss";',
    ].join("\n");
    appendFile(destinationIndexPath, newsImportPart);
  }
}