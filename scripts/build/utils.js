import { cp, rm } from "fs/promises";

export const copyDirectory = async (src, dest) => {
  try {
    await cp(src, dest, { recursive: true });
    console.log(`Copied directory from ${src} to ${dest}`);
  } catch (error) {
    console.error(`Error copying directory from ${src} to ${dest}:`, error);
    throw error;
  }
};

export const removeDirectory = async (dir) => {
  try {
    await rm(dir, { recursive: true, force: true });
    console.log(`Removed directory: ${dir}`);
  } catch (error) {
    console.error(`Error removing directory: ${dir}`, error);
    throw error;
  }
};
