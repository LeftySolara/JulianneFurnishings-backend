import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: [
      { find: "@infra", replacement: path.resolve(__dirname, "src/infra") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "src/utils"),
      },
      {
        find: "@domain",
        replacement: path.resolve(__dirname, "src/domain"),
      },
    ],
  },
});
