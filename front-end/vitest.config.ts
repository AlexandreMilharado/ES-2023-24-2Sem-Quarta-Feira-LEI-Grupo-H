import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "docs/*"],
    coverage: {
      exclude: [...configDefaults.exclude, "docs/*", "tests/utilities.ts", "index.d.ts"],
    },
  },
});
