import path from 'path';
import { appendFile, createModules, installModule } from "../../installer.js";

export function init(projectConfig) {
  const moduleName = "form";
  const { destinationPath } = createModules(projectConfig);
  const requiredDefaultFiles = [
    "/config/colors.scss",
    "/config/spaces.scss",
    "/config/borders.scss",
    "/config/fonts.scss",
    "/config/animation.scss",
    "/helper/accessibility.scss",
    "/helper/borders.scss",
    "/helper/spaces.scss",
    "/helper/text.scss",
  ];

  // install module
  const moduleInstalled = installModule(moduleName, projectConfig, {
    requiredDefaultFiles,
  });

  // Check if it's first install
  if (moduleInstalled) {
    // Setup files to update
    const indexFile = "/_index.scss";
    const destinationIndexPath = path.resolve(destinationPath, `.${indexFile}`);

    // Import files into _index.scss
    const newsImportPart = [
      "// form module",
      '@use "./component/Form.scss";',
    ].join("\n");
    appendFile(destinationIndexPath, newsImportPart);
  }
}
