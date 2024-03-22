// import { notFound } from "next/navigation";
// import { getLocale, getRequestConfig } from 'next-intl/server';

// const locales: string[] = ['en', 'de', 'es', 'sv', 'nl', 'no'];

// export default getRequestConfig(async (params) => {
//   if (!locales.includes(params.locale as any)) notFound();
//  console.log("Locale inside getRequestConfig", params);
//  const localeFromGetLocale = await getLocale();
//  console.log("Get locale", localeFromGetLocale);
//   return {
//     messages: (await import(`../content/${params.locale}.json`)).default
//   };
// });