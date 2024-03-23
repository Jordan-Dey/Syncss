import path from 'path';
import { appendFile, createModules, installModule } from "../../installer.js";

export function init(projectConfig) {
  const moduleName = "form";
  const { destinationPath } = createModules(projectConfig);
  const requiredDefaultFiles = [
    "/configs/colors.scss",
    "/configs/spaces.scss",
    "/configs/borders.scss",
    "/configs/fonts.scss",
    "/configs/animation.scss",
    "/helpers/accessibility.scss",
    "/helpers/borders.scss",
    "/helpers/spaces.scss",
    "/helpers/text.scss",
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
      '@use "./components/form.scss";',
    ].join("\n");
    appendFile(destinationIndexPath, newsImportPart);
  }
}
