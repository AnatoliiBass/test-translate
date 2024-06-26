import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { locales } from "@/constant";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export async function generateStaticParams() {
  return [...locales.map((locale) => ({ locale: locale.language }))];
}

export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string};
}>) {
  console.log("Locale: ", params);
  // const allLocales = cldr.extractLanguageSupplementalData();
  // console.log("All locales", allLocales);
  return (
    <html lang={params.locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
