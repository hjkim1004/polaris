import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readSite } from "@/lib/content.mjs";
import { LOCALES } from "@/lib/labels";
import Chrome from "@/components/Chrome";
import HomeBody from "@/components/HomeBody";

/**
 * 언어별 홈.
 *
 * 기본 언어는 `/` 가 이미 그리므로 여기서 빼 둔다 — 같은 화면이 두 주소에 서면
 * 검색 엔진이 어느 쪽을 정본으로 볼지 스스로 정하고, 그 선택을 우리가 못 본다.
 */
export function generateStaticParams() {
  const def = readSite().defaultLocale;
  return LOCALES.filter((l) => l.value !== def).map((l) => ({ locale: l.value }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const site = readSite(locale);
  return { title: site.name, description: site.tagline };
}

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!LOCALES.some((l) => l.value === locale)) notFound();
  return (
    <Chrome locale={locale}>
      <HomeBody locale={locale} />
    </Chrome>
  );
}
