import { useStorage } from "@/hooks/storage";
import type { Element as ExposingElement } from "@/types";
import { isMatch } from "matcher";
import { useCallback, useMemo } from "react";

export const useSiteElements = () => {
  const [allElements, setAllElements] = useStorage<ExposingElement[]>("local:elements", []);

  const hostname = useMemo(() => new URL(document.location.href).hostname, []);

  const siteElements = useMemo(
    () => allElements.filter(e => isMatch(hostname, e.website)),
    [allElements, hostname]
  );

  const setSiteElements = useCallback(
    async (nextSiteElements: ExposingElement[]) => {
      const normalized = nextSiteElements.map(e => ({ ...e, website: e.website ?? hostname }));
      const others = allElements.filter(e => !isMatch(hostname, e.website));
      await setAllElements([...others, ...normalized]);
    },
    [allElements, hostname, setAllElements]
  );

  const add = useCallback(
    async (element: Omit<ExposingElement, "website"> | ExposingElement) => {
      const withSite: ExposingElement = { website: hostname, ...element } as ExposingElement;
      await setSiteElements([...siteElements, withSite]);
    },
    [hostname, setSiteElements, siteElements]
  );

  const removeAt = useCallback(
    async (index: number) => {
      const next = siteElements.filter((_, i) => i !== index);
      await setSiteElements(next);
    },
    [setSiteElements, siteElements]
  );

  const clear = useCallback(async () => {
    const others = allElements.filter(e => !isMatch(hostname, e.website));
    await setAllElements(others);
  }, [allElements, hostname, setAllElements]);

  return { elements: siteElements, setSiteElements, add, removeAt, clear, hostname };
};
