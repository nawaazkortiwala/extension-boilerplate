import { main } from "./main.js";

(async () => {
  try {
    await main();
  } catch (error) {
    console.error("Build failed:", error);
  }
})();
