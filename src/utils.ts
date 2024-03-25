import { NextRequest } from "next/server";
import { ipAddressRegex } from "./constant";

function isIpAddress(str:string): boolean {
    return ipAddressRegex.test(str);
  }
  
  
  export function getIp(request: NextRequest): string {
    console.log("Request", request)
    const ip1 = request.headers.get("x-forwarded-for");
    console.log("IP1", ip1);
    if (ip1 && isIpAddress(ip1)) {
      return ip1;
    }
    const ip2 = request.headers.get("cf-connecting-ip");
    console.log("IP2", ip2);
    if (ip2 && isIpAddress(ip2)) {
      return ip2;
    }
     const ip3 = request.headers.get("x-real-ip");
    console.log("IP3", ip3);
    if (ip3 && isIpAddress(ip3)) {
      return ip3;
    }
    const ip4 = request.headers.get("x-client-ip");
    console.log("IP4", ip4);
    if (ip4 && isIpAddress(ip4)) {
      return ip4;
    }
    const ip5 = request.headers.get("x-host");
    console.log("IP5", ip5);
    if (ip5 && isIpAddress(ip5)) {
      return ip5;
    }
    const ip6 = request.headers.get("x-originating-ip");
    console.log("IP6", ip6);
    if (ip6 && isIpAddress(ip6)) {
      return ip6;
    }
    const ip7 = request.headers.get("x-remote-ip");
    console.log("IP7", ip7);
    if (ip7 && isIpAddress(ip7)) {
      return ip7;
    }
    const ip8 = request.headers.get("x-remote-addr");
    console.log("IP8", ip8);
    if (ip8 && isIpAddress(ip8)) {
      return ip8;
    }
    const ip9 = request.headers.get("x-remote-host");
    console.log("IP9", ip9);
    if (ip9 && isIpAddress(ip9)) {
      return ip9;
    }
    return '';
  }