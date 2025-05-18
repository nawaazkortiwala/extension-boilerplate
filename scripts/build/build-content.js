// Runs the build command for the content script.
import { build } from "esbuild";
import { join, resolve } from "path";
import { distDirName, packageJson, projectRootPath, srcDirName } from "./config.js";

/**
 * Builds the content script for the extension.
 *
 * @param {string} basePath - The root directory of the project.
 * @returns {Promise<ContentBuildOutput>}
 */
export const buildContent = async (basePath) => {
  const dirname = "content";
  const distDir = join(distDirName, dirname);
  const outdir = resolve(basePath, distDir);
  const entryPoints = [
    resolve(projectRootPath, srcDirName, "content/index.ts"),
    resolve(projectRootPath, srcDirName, "content/inject.ts"),
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
    const output = {
      path: join(dirname, "index.js"),
      resources: [join(dirname, "inject.js")],
    };
    console.log("Content script built successfully: ", output);
    return output;
  } catch (error) {
    console.error("Error building content script:", error);
    throw error;
  }
};
