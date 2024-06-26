import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "./constant";
import { getIp } from "./utils";

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
console.log("Pathname", pathname);
  // if (
  //   pathname.startsWith(`/${defaultLocale}/`) ||
  //   pathname === `/${defaultLocale}`
  // ) {
  //   // The incoming request is for /en/whatever, so we'll reDIRECT to /whatever
  //   console.log("Default value");
  //   return NextResponse.redirect(
  //     new URL(
  //       pathname.replace(
  //         `/${defaultLocale}`,
  //       pathname === `/${defaultLocale}` ? "/" : ""
  //       ),
  //       request.url
  //     )
  //   );
  // }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale.language}/`) && pathname !== `/${locale.language}`
  );

  if (pathname=== "/") {
    console.log("Pathname is missing locale");
    const ip = getIp(request);
    console.log("IP in middleware", ip);
    if(ip) {
      // await fetch(`https://ipinfo.io/${ip}/country`).then((res) => res.text()).then((data) => {
        // const data = request.headers.get("x-forwarded-for");
        console.log("Request.headers", request.geo?.country);
        const data = request.geo?.country;
        console.log("Data", data);
        if (!data) {
          return NextResponse.redirect(
            new URL(
              `/${defaultLocale}${pathname}${request.nextUrl.search}`,
              request.nextUrl.href
            )
          );
        }
        const currentLocale = locales.find((locale) => locale.country === data);
        console.log("Current locale", currentLocale);
        console.log("Request.nextUrl.href", request.nextUrl.href);
        console.log("Request.url", request.url);
        console.log("Request.nextUrl.search", request.nextUrl.search);
        if(currentLocale && currentLocale.language){
          return NextResponse.redirect(
            new URL(
              `/${currentLocale.language}${pathname}${request.nextUrl.search}`,
              request.url
            )
          );
        }else{
          return NextResponse.redirect(
            new URL(
              `/${defaultLocale}${pathname}${request.nextUrl.search}`,
              request.nextUrl.href
            )
          );
        }
      // });
    }else{
      // Now for EITHER /en or /nl (for example) we're going to tell Next.js that the request is for /en/whatever
    // or /nl/whatever, and then reWRITE the request to that it is handled properly.
    return NextResponse.redirect(
      new URL(
        `/${defaultLocale}${pathname}${request.nextUrl.search}`,
        request.nextUrl.href
      )
    );
    }
  }else{
    // return NextResponse.redirect(
    //   new URL(
    //     `/${pathname}${request.nextUrl.search}`,
    //     request.nextUrl.href
    //   )
    // );
      }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // "/((?!api|static|.*\\..*|_next).*)",
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};