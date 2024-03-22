import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from "next/server";
import geoip from 'geoip-lite';
 
let locales = ['en', 'de', 'es', 'sv', 'nl'];
const ipAddressRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

function isIpAddress(str:string): boolean {
  return ipAddressRegex.test(str);
}

function getCountryByIp(request: NextRequest): string {
  console.log("Request", request)
  const ip1 = request.headers.get("x-forwarded-for");
  console.log("IP1", ip1);
  // if (ip1 && isIpAddress(ip1)) {
  //   const geo = geoip.lookup(ip1);
  //   if (geo) {
  //     console.log("x-forwarded-for", geo.country.toLowerCase());
  //   }
  // }
  const ip2 = request.headers.get("cf-connecting-ip");
  console.log("IP2", ip2);
  // if (ip2 && isIpAddress(ip2)) {
  //   const geo = geoip.lookup(ip2);
  //   if (geo) {
  //     console.log("cf-connecting-ip", geo.country.toLowerCase());
  //   }
  // }
   const ip3 = request.headers.get("x-real-ip");
  console.log("IP3", ip3);
  // if (ip3 && isIpAddress(ip3)) {
  //   const geo = geoip.lookup(ip3);
  //   if (geo) {
  //     console.log("x-real-ip", geo.country.toLowerCase());
  //   }
  // }
  const ip4 = request.headers.get("x-client-ip");
  console.log("IP4", ip4);
  // if (ip4 && isIpAddress(ip4)) {
  //   const geo = geoip.lookup(ip4);
  //   if (geo) {
  //     console.log("x-client-ip", geo.country.toLowerCase());
  //   }
  // }
  const ip5 = request.headers.get("x-host");
  console.log("IP5", ip5);
  // if (ip5 && isIpAddress(ip5)) {
  //   const geo = geoip.lookup(ip5);
  //   if (geo) {
  //     console.log("x-host", geo.country.toLowerCase());
  //   }
  // }
  const ip6 = request.headers.get("x-originating-ip");
  console.log("IP6", ip6);
  // if (ip6 && isIpAddress(ip6)) {
  //   const geo = geoip.lookup(ip6);
  //   if (geo) {
  //     console.log("x-originating-ip", geo.country.toLowerCase());
  //   }
  // }
  const ip7 = request.headers.get("x-remote-ip");
  console.log("IP7", ip7);
  // if (ip7 && isIpAddress(ip7)) {
  //   const geo = geoip.lookup(ip7);
  //   if (geo) {
  //     console.log("x-remote-ip", geo.country.toLowerCase());
  //   }
  // }
  const ip8 = request.headers.get("x-remote-addr");
  console.log("IP8", ip8);
  // if (ip8 && isIpAddress(ip8)) {
  //   const geo = geoip.lookup(ip8);
  //   if (geo) {
  //     console.log("x-remote-addr", geo.country.toLowerCase());
  //   }
  // }
  const ip9 = request.headers.get("x-remote-host");
  console.log("IP9", ip9);
  // if (ip9 && isIpAddress(ip9)) {
  //   const geo = geoip.lookup(ip9);
  //   if (geo) {
  //     console.log("x-remote-host", geo.country.toLowerCase());
  //   }
  // }
  return 'en';
}

// const middleware = createMiddleware({
//   // Add locales you want in the app
//   locales: ['en', 'de', 'es', 'sv', 'nl', 'no'],
//   domains: [],
//   // Default locale if no match
//   defaultLocale: 'en'
// });

// export default middleware;

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(de|es|en|sv|nl|no)/:page*']
// };


 
// Get the preferred locale, similar to the above or using a library
// function getLocale(request) { console.log(request) }
 
export default async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  getCountryByIp(request);
  const { pathname } = request.nextUrl
  // const ip = request.headers.get("x-forwarded-for");
  const ip ="193.215.41.146";
  console.log("IP", ip)
  // const geo = geoip.lookup(ip as string);
  // console.log("Geo", geo);
  const data = await fetch(`https://ipinfo.io/${ip}/country`).then((res) => res.text());
  console.log("Data", data);
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${data}/`) || pathname === `/${data}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  // const locale = getLocale(request)
  request.nextUrl.pathname = `/${data}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: ['/', '/(de|es|en|sv|nl|no)/:page*']
  // matcher: [
  //   // Skip all internal paths (_next)
  //   '/((?!_next).*)',
  //   // Optional: only run on root (/) URL
  //   // '/'
  // ],
}