import { notFound } from "next/navigation";
import {
  listApps,
  listDocs,
  pastVersions,
  publishedLocales,
  readApp,
  readDoc,
  resolve,
  upcomingVersion,
} from "@/lib/content.mjs";
import DocScreen from "@/components/DocScreen";
import LocaleAutoSwitch from "@/components/LocaleAutoSwitch";

export function generateStaticParams() {
  const out: { app: string; doc: string }[] = [];
  for (const app of listApps())
    for (const doc of listDocs(app.slug))
      if (publishedLocales(app.slug, doc.slug).length) out.push({ app: app.slug, doc: doc.slug });
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string; doc: string }>;
}) {
  const { app, doc } = await params;
  const meta = readApp(app);
  const hit = meta ? resolve(app, doc, meta.defaultLocale) : null;
  return { title: hit ? `${hit.version.title} — ${meta!.name}` : "약관" };
}

export default async function DocDefaultPage({
  params,
}: {
  params: Promise<{ app: string; doc: string }>;
}) {
  const { app, doc } = await params;
  const appMeta = readApp(app);
  const docMeta = readDoc(app, doc);
  if (!appMeta || !docMeta) notFound();

  const hit = resolve(app, doc, appMeta.defaultLocale);
  if (!hit) notFound();

  const locales = publishedLocales(app, doc);

  return (
    <>
      <LocaleAutoSwitch
        available={locales}
        served={hit.servedLocale}
        base={`/t/${app}/${doc}`}
      />
      <DocScreen
        app={appMeta}
        doc={docMeta}
        version={hit.version}
        locale={hit.servedLocale}
        locales={locales}
        past={pastVersions(app, doc, hit.servedLocale)}
        upcoming={upcomingVersion(app, doc, hit.servedLocale)}
      />
    </>
  );
}
