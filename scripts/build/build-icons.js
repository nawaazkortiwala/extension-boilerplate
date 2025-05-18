import { copyDirectory } from "./utils.js";
import { join, resolve } from "path";
import { projectRootPath, srcDirName, distDirName } from "./config.js";

/**
 * Builds the icons for the extension.
 * @param {string} basePath - The base path where the icons should be output.
 * @returns {Promise<IconsBuildOutput>} A promise that resolves to an array of icon configuration objects.
 */

export const buildIcons = async (basePath) => {
  const dirname = "icons";
  const srcIcons = resolve(projectRootPath, srcDirName, dirname);
  const outDir = resolve(basePath, distDirName, dirname);
  const pngs = [
    {
      name: "icon128.png",
      size: 128,
    },
  ];

  /**
   * @type {IconConfig[]}
   */
  const config = pngs.map((png) => ({
    path: join(dirname, png.name),
    size: png.size,
  }));

  await copyDirectory(srcIcons, outDir);
  console.log("Icons copied successfully:", outDir);
  return { config };
};
