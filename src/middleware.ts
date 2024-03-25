import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "./constant";
import { getIp } from "./utils";

export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
console.log("Pathname", pathname);
  if (
    pathname.startsWith(`/${defaultLocale}/`) ||
    pathname === `/${defaultLocale}`
  ) {
    // The incoming request is for /en/whatever, so we'll reDIRECT to /whatever
    console.log("Default value");
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${defaultLocale}`,
          pathname === `/${defaultLocale}` ? "/" : ""
        ),
        request.url
      )
    );
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale.language}/`) && pathname !== `/${locale.language}`
  );

  if (pathnameIsMissingLocale) {
    console.log("Pathname is missing locale");
    const ip = getIp(request);
    console.log("IP in middleware", ip);
    if(ip) {
      const data = await fetch(`https://ipinfo.io/${ip}/country`).then((res) => {console.log("res.text: ", res.text());return res.text()});
      console.log("Data", data);
      const currentLocale = locales.find((locale) => locale.country === data.trim());
      if(currentLocale && currentLocale.language){
        return NextResponse.rewrite(
          new URL(
            `/${currentLocale.language}${pathname}${request.nextUrl.search}`,
            request.nextUrl.href
          )
        );
      }else{
        return NextResponse.rewrite(
          new URL(
            `/${defaultLocale}${pathname}${request.nextUrl.search}`,
            request.nextUrl.href
          )
        );
      }
    }else{
      // Now for EITHER /en or /nl (for example) we're going to tell Next.js that the request is for /en/whatever
    // or /nl/whatever, and then reWRITE the request to that it is handled properly.
    return NextResponse.rewrite(
      new URL(
        `/${defaultLocale}${pathname}${request.nextUrl.search}`,
        request.nextUrl.href
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