// Runs the build process for the background script.
import { build } from "esbuild";
import { join, resolve } from "path";
import { distDirName, packageJson, projectRootPath, srcDirName } from "./config.js";

/**
 * Builds the background script for the extension.
 *
 * @param {string} basePath - The root directory of the project.
 * @returns {Promise<BackgroundBuildOutput>}
 */
export const buildBackground = async (basePath) => {
  const dirname = "background";
  const distDir = join(distDirName, dirname);
  const outdir = resolve(basePath, distDir);
  const entryPoints = [
    resolve(projectRootPath, srcDirName, "background/index.ts"),
    resolve(projectRootPath, srcDirName, "background/script.ts"),
  ];
  const options = {
    entryPoints,
    outdir,
    bundle: true,
    sourcemap: false,
    minify: false,
    format: "iife",
    target: "esnext",
    platform: "browser",
    external: [],
    define: {
      "import.meta.env.VERSION": JSON.stringify(packageJson.version),
      "import.meta.env.BUILD_DATE": JSON.stringify(new Date().toISOString()),
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  };

  try {
    await build(options);
    console.log("Background script built successfully: ", outdir);

    return {
      path: join(dirname, "index.js"),
    };
  } catch (error) {
    console.error("Error building background script:", error);
    throw error;
  }
};
