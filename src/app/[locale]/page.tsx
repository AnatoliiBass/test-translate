//import { useTranslations } from "next-intl";
export default async function Home({params: {locale}}: {params: {locale: string}}) {
  console.log("page.tsx", locale);
  // const t = useTranslations("Home");

  // Extract the navigation object keys from the translations
  // const navigationKeys = Object.keys(t.raw("navigation"));
  return (
    <>
    <nav className="sm:flex hidden items-center justify-center ">
      {/* <ul className="absolute top-8 flex items-center space-x-5">
        {navigationKeys.map((key) => (
          <li key={key} className="animate pop delay-1">
            <a href={`#/${key}`}>{t(`navigation.${key}`)}</a>
          </li>
        ))}
      </ul>*/}
    </nav> 
    <main className="lg:px-[160px] sm:px-[40px] px-[16px] bg-gray-50 h-[100vh]">
      <div className="flex md:flex-row flex-col items-start justify-between md:pt-32 pt-12 md:text-left text-center">
        {/* <aside className="max-w-[550px] md:mr-20">
          <h2 className="md:text-5xl text-3xl animate pop delay-1">{t("title")}</h2>
          <p
            className="pt-5 animate pop"
            dangerouslySetInnerHTML={{ __html: t("description") }}
          ></p>
        </aside> */}
        Start page
      </div>
    </main>
  </>
  );
}
