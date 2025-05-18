/**
 * @typedef {Object} ContentBuildOutput
 * @property {string} path - The main output JS file for the content script.
 * @property {string[]} resources - Additional resources (e.g., inject.js) for the content script.
 */

/**
 * @typedef {Object} BackgroundBuildOutput
 * @property {string} path - The main output JS file for the background script.
 */

/**
 * @typedef {Object} PopupBuildOutput
 * @property {string} path - The path to the popup HTML file.
 */

/**
 * @typedef {Object} IconsBuildOutput
 * @property {IconConfig[]} config - An array of icon configuration objects.
 */

/**
 * @typedef {Object} IconConfig
 * @property {string} path - The relative path to the icon file.
 * @property {number} size - The size (in pixels) of the icon.
 * @property {boolean} [default] - Whether this icon is the default (optional).
 */

/**
 * @typedef {Object} Manifest
 * @property {number} manifest_version
 * @property {string} name
 * @property {string} version
 * @property {string} description
 * @property {string[]} permissions
 * @property {string[]} host_permissions
 * @property {Background} background
 * @property {Contentscript[]} content_scripts
 * @property {Action} action
 * @property {Defaulticon} icons
 * @property {Webaccessibleresource[]} web_accessible_resources
 */

/**
 * @typedef {Object} Background
 * @property {string} service_worker
 * @property {string} type
 */

/**
 * @typedef {Object} Contentscript
 * @property {string[]} matches
 * @property {string[]} js
 */

/**
 * @typedef {Object} Action
 * @property {string} default_popup
 * @property {Defaulticon} default_icon
 */

/**
 * @typedef {Object} Defaulticon
 * @property {string} 128
 */

/**
 * @typedef {Object} Webaccessibleresource
 * @property {string[]} resources
 * @property {string[]} matches
 */

/**
 * Builds the content script for the extension.
 * @function
 * @param {string} basePath - The root directory of the project.
 * @returns {Promise<ContentBuildOutput>}
 */

/**
 * Builds the background script for the extension.
 * @function
 * @param {string} basePath - The root directory of the project.
 * @returns {Promise<BackgroundBuildOutput>}
 */

/**
 * Builds the popup using Vite configuration.
 * @function
 * @param {string} basePath - Temporary build directory.
 * @returns {Promise<PopupBuildOutput>}
 */

/**
 * Copies icon assets into the dist/icons directory.
 * @function
 * @param {string} basePath - Temporary build directory.
 * @returns {Promise<IconsBuildOutput>}
 */
