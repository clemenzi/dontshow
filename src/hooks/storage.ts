import { storage } from "@wxt-dev/storage";
import { useEffect, useState } from "react";

export const useStorage = <T>(key: StorageItemKey, defaultValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);

  useEffect(() => {
    const loadValue = async () => {
      const value = await storage.getItem<T>(key);
      if (value === null || value === undefined) {
        await storage.setItem(key, defaultValue);
        setStoredValue(defaultValue);
      } else {
        setStoredValue(value);
      }
    };

    loadValue();

    const unwatch = storage.watch<T>(key, newValue => {
      setStoredValue(newValue ?? defaultValue);
    });

    return () => {
      unwatch();
    };
  }, [key, defaultValue]);

  const setValue = async (value: T) => {
    await storage.setItem(key, value);
    setStoredValue(value);
  };

  return [storedValue, setValue];
};
