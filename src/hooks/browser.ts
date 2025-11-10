export const useCurrentTab = () => {
  const [currentTab, setCurrentTab] = useState<Browser.tabs.Tab | null>(null);

  useEffect(() => {
    const fetchCurrentTab = async () => {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      setCurrentTab(tabs[0] || null);
    };

    fetchCurrentTab();

    const tabUpdatedListener = (tabId: number, changeInfo: Browser.tabs.TabChangeInfo) => {
      if (changeInfo.status === "complete") {
        fetchCurrentTab();
      }
    };

    browser.tabs.onUpdated.addListener(tabUpdatedListener);

    return () => {
      browser.tabs.onUpdated.removeListener(tabUpdatedListener);
    };
  }, []);

  return currentTab;
};
