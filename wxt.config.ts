import tailwindcss from "@tailwindcss/vite";
import { generateTypeFile, parseMessagesFile } from "@wxt-dev/i18n/build";
import path from "path";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons", "@wxt-dev/i18n/module"],
  srcDir: "src",
  outDir: "dist",

  vite: () => ({
    plugins: [
      tailwindcss(),
      {
        name: "gen-language-types",
        async configureServer({ watcher }) {
          watcher.on("change", async file => {
            if (file.endsWith(".yml") && file.includes("locales")) {
              const en = await parseMessagesFile("src/locales/en.yml");

              await generateTypeFile("src/i18n.d.ts", en);
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }),

  manifest: {
    name: "Don't Show",
    permissions: ["storage", "contextMenus"],
    options_page: "settings.html",
    default_locale: "en",
  },
});
