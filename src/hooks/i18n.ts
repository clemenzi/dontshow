import { GeneratedI18nStructure } from "@/i18n";
import { createI18n } from "@wxt-dev/i18n";

type KeysStartingWith<T, Prefix extends string> = {
  [K in keyof T]: K extends `${Prefix}.${infer Rest}` ? Rest : never;
}[keyof T];

type PrefixedT<Prefix extends string> = <
  K extends KeysStartingWith<GeneratedI18nStructure, Prefix>,
>(
  key: K,
  substitutions?: any
) => string;

export const useTranslation = <K extends string = never>(key?: K) => {
  const i18n = createI18n<GeneratedI18nStructure>();

  type CustomT = K extends string ? PrefixedT<K> : typeof i18n.t;

  const customT = key
    ? (((subKey: string, params?: any) => (i18n.t as any)(`${key}.${subKey}`, params)) as CustomT)
    : (i18n.t as CustomT);

  return {
    ...i18n,
    t: customT,
  };
};
