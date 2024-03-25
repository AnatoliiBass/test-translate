import "server-only";

const dictionaries: any = {
  en: () => import("./en.json").then((module) => module.default),
  nl: () => import("./nl.json").then((module) => module.default),
  de: () => import("./de.json").then((module) => module.default),
  es: () => import("./es.json").then((module) => module.default),
  sv: () => import("./sv.json").then((module) => module.default),
  no: () => import("./no.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
