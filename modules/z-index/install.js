import { installModule } from "../../installer.js";

export function init(projectConfig) {
  const moduleName = "z-index";

  // Install module
  installModule(moduleName, projectConfig);
}
