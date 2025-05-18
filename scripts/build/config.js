import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const projectRootPath = resolve(__dirname, "../../");
export const srcDirName = "src";
export const distDirName = "dist";
export const packageJson = JSON.parse(
  readFileSync(resolve(projectRootPath, "package.json"), "utf-8"),
);
export const tempPath = resolve(projectRootPath, "temp");
