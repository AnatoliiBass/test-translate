import createMiddleware from 'next-intl/middleware';

const middleware = createMiddleware({
  // Add locales you want in the app
  locales: ['en', 'de', 'es', 'sv', 'nl', 'no'],
  domains: [],
  // Default locale if no match
  defaultLocale: 'en'
});

export default middleware;

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|es|en|sv|nl|no)/:page*']
};

// import { NextRequest, NextResponse } from "next/server";
// import geoip from 'geoip-lite';
 
// let locales = ['en', 'de', 'es', 'sv', 'nl'];
 
// // Get the preferred locale, similar to the above or using a library
// // function getLocale(request) { console.log(request) }
 
// export default function middleware(request: NextRequest) {
//   // Check if there is any supported locale in the pathname
//   console.log("Request", request)
//   const { pathname } = request.nextUrl
//   const ip = request.headers.get("x-forwarded-for");
//   console.log("IP", ip)
//   // const geo = geoip.lookup(ip as string);
//   // console.log("Geo", geo);
//   //fetch(`https://ipinfo.io/${'104.26.1.188'}`).then((res) => res.text()).then((data) => {console.log("Data", data)});
//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   )
 
//   if (pathnameHasLocale) return
 
//   // Redirect if there is no locale
//   // const locale = getLocale(request)
//   request.nextUrl.pathname = `/${locales[0]}${pathname}`
//   // e.g. incoming request is /products
//   // The new URL is now /en-US/products
//   return NextResponse.redirect(request.nextUrl)
// }
 
// export const config = {
//   matcher: [
//     // Skip all internal paths (_next)
//     '/((?!_next).*)',
//     // Optional: only run on root (/) URL
//     // '/'
//   ],
// }