import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "./constant";
import { getIp } from "./utils";

export async function middleware(request: NextRequest) {
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

  if (pathnameIsMissingLocale) {
    console.log("Pathname is missing locale");
    const ip = getIp(request);
    console.log("IP in middleware", ip);
    if(ip) {
      await fetch(`https://ipinfo.io/${ip}/country`).then((res) => res.text()).then((data) => {
        console.log("Data", data);
        const currentLocale = locales.find((locale) => locale.country === data.trim());
        console.log("Current locale", currentLocale);
        console.log("Request.nextUrl.href", request.nextUrl.href);
        console.log("Request.url", request.url);
        console.log("Request.nextUrl.search", request.nextUrl.search);
        if(currentLocale && currentLocale.language){
          return NextResponse.redirect(
            new URL(
              `${currentLocale.language}${pathname}${request.nextUrl.search}`
            )
          );
        }else{
          return NextResponse.redirect(
            new URL(
              `/${defaultLocale}${pathname}${request.nextUrl.search}`
            )
          );
        }
      });
    }else{
      // Now for EITHER /en or /nl (for example) we're going to tell Next.js that the request is for /en/whatever
    // or /nl/whatever, and then reWRITE the request to that it is handled properly.
    return NextResponse.redirect(
      new URL(
        `/${defaultLocale}${pathname}${request.nextUrl.search}`
      )
    );
    }
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|static|.*\\..*|_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};