import { Settings } from "@/types";
import consola, { ConsolaInstance, createConsola } from "consola";

export const log: ConsolaInstance = createConsola({
  reporters: [
    {
      async log(logObj, ctx) {
        const settings = await storage.getItem<Settings>("local:settings");

        if (!settings?.debugMessages) return;

        const type = logObj.type;
        const consoleMethod = type === "fatal" ? "error" : type;

        const logger = consola.withTag("dontshow");
        logger[consoleMethod](
          logObj.args
            .map(arg => {
              if (typeof arg === "object" && arg !== null) {
                return JSON.stringify(arg, null, 2);
              }
              return arg;
            })
            .join(" ")
        );
      },
    },
  ],
});
