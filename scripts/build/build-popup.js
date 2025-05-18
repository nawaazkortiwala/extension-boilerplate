import { build as viteBuild } from "vite";
import { resolve, join } from "path";
import { projectRootPath, srcDirName, distDirName } from "./config.js";

/**
 * Builds the popup using Vite configuration.
 *
 * @param {string} basePath - Temporary build directory.
 * @returns {Promise<{path:string}>}
 */
export const buildPopup = async (basePath) => {
  const dirname = "popup";
  const root = resolve(projectRootPath, srcDirName, dirname);
  const outDir = resolve(basePath, distDirName, dirname);

  await viteBuild({
    base: "./",
    configFile: resolve(root, "vite.config.ts"),
    build: { outDir },
  });

  console.log("Popup built successfully:", outDir);
  return { path: join(dirname, "index.html") };
};
