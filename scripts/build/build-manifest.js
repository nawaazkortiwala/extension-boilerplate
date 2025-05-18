import { writeFile } from "fs/promises";
import { resolve } from "path";
import { distDirName } from "./config.js";
// @ts-check
// eslint-disable-next-line no-unused-vars
/// <reference path="../types.js" />

const BASE_URL = "https://example.com/*";

/**
 * Generates the manifest.json file for the extension.
 *
 * @param {string} basePath - The root directory for the build output.
 * @param {{popup: PopupBuildOutput, content: ContentBuildOutput, background: BackgroundBuildOutput, icons: IconsBuildOutput}} options - Build outputs from other steps.
 * @returns {Promise<void>}
 */
export const buildManifest = async (basePath, { popup, content, background, icons }) => {
  try {
    // Build icons and default_icon objects from icons.config array
    const iconsObj = {};
    const defaultIconObj = {};
    if (Array.isArray(icons.config)) {
      for (const icon of icons.config) {
        iconsObj[String(icon.size)] = icon.path;
        if (icon.default) {
          defaultIconObj[String(icon.size)] = icon.path;
        }
      }
      // If no icon is marked as default, use the first as default_icon
      if (Object.keys(defaultIconObj).length === 0 && icons.config.length > 0) {
        const first = icons.config[0];
        defaultIconObj[String(first.size)] = first.path;
      }
    }

    const manifest = {
      manifest_version: 3,
      name: "Boilerplate Extension",
      version: "1.0.0",
      description: "A boilerplate Chrome extension.",
      permissions: ["scripting", "activeTab", "storage"],
      host_permissions: [BASE_URL],
      background: {
        service_worker: background.path,
        type: "module",
      },
      content_scripts: [
        {
          matches: [BASE_URL],
          js: [content.path],
        },
      ],
      action: {
        default_popup: popup.path,
        default_icon: defaultIconObj,
      },
      icons: iconsObj,
      web_accessible_resources: [
        {
          resources: content.resources,
          matches: [BASE_URL],
        },
      ],
    };

    const outDir = resolve(basePath, distDirName);
    const manifestPath = resolve(outDir, "manifest.json");
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
    console.log("Manifest generated:", manifest);
  } catch (error) {
    console.error("Error generating manifest.json:", error);
    throw error;
  }
};
