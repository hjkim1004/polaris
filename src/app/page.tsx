import { readSite } from "@/lib/content.mjs";
import Chrome from "@/components/Chrome";
import HomeBody from "@/components/HomeBody";

/** 기본 언어의 홈. 다른 언어는 `/<언어>/` 가 같은 것을 그린다 */
export default function Home() {
  const locale = readSite().defaultLocale;
  return (
    <Chrome locale={locale}>
      <HomeBody locale={locale} />
    </Chrome>
  );
}
