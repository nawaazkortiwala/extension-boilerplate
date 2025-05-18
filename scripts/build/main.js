// Run build scripts
import { buildContent } from "./build-content.js";
import { buildBackground } from "./build-background.js";
import { buildManifest } from "./build-manifest.js";
import { buildPopup } from "./build-popup.js";
import { buildIcons } from "./build-icons.js";
import { copyDirectory, removeDirectory } from "./utils.js";
import { distDirName, projectRootPath, tempPath } from "./config.js";
import { join } from "path";

const runBuild = async (basePath) => {
  const popupOutput = await buildPopup(basePath);
  const contentOutput = await buildContent(basePath);
  const backgroundOutput = await buildBackground(basePath);
  const iconsOutput = await buildIcons(basePath);
  await buildManifest(basePath, {
    popup: popupOutput,
    content: contentOutput,
    background: backgroundOutput,
    icons: iconsOutput,
  });
};

export const main = async () => {
  try {
    await runBuild(tempPath);
    // Only move from temp to dist if all builds are successful
    // This ensures that if any build fails, the dist folder remains unchanged.
    await removeDirectory(join(projectRootPath, distDirName));
    await copyDirectory(tempPath, projectRootPath);
  } catch (error) {
    console.error("Build failed:", error);
  } finally {
    // Clean up the temporary build directory
    await removeDirectory(tempPath);
  }
};
