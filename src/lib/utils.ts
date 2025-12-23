import { Filter } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { isMatch } from "matcher";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const textReplacement = (
  type: Filter["type"],
  text: string,
  expression?: string
): string => {
  if (type === "censor") {
    return text.replace(new RegExp(expression ?? "", "gi"), match => "*".repeat(match.length));
  } else if (type === "remove") {
    return "";
  }

  return text;
};

export const isEnabled = async (): Promise<boolean> => {
  let res = true;

  const enabled = await storage.getItem<boolean>("local:enabled");
  res = enabled ?? true;

  const disabledWebsites = await storage.getItem<string[]>("local:disabledWebsites");
  const url = new URL(document.location.href);
  if (disabledWebsites?.includes(url.hostname)) {
    res = false;
  }

  return res;
};

export const getProcessableFilters = async (): Promise<Filter[]> => {
  const filters = await storage.getItem<Filter[]>("local:filters");

  if (!filters) return [];

  return (
    filters?.filter(f => {
      const url = new URL(document.location.href);

      const domainMatches = isMatch(url.hostname, f.domain);
      // Path matching: if path is not set or empty, match all paths
      const pathMatches = !f.path || isMatch(url.pathname, f.path);

      return f.expression && domainMatches && pathMatches && f.enabled;
    }) ?? []
  );
};
