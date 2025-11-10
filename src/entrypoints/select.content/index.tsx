import "@/assets/global.css";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "exposing-element-selection",
      position: "inline",
      anchor: "body",
      async onMount(container) {
        const app = document.createElement("div");
        container.append(app);

        const root = ReactDOM.createRoot(app);
        root.render(<App onClose={() => ui.remove()} />);
        return root;
      },
    });

    browser.runtime.onMessage.addListener(message => {
      if (message === "exposing-element-selection") {
        if (ui.mounted) {
          ui.remove();
        } else {
          ui.mount();
        }
      }
    });
  },
});
