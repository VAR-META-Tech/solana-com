import { coursesSource } from "@/app/sources/courses";
import Courses from "./courses-index";

import { DefaultCard } from "@solana-foundation/solana-lib/dist/components/CardDeck/DefaultCard/defaultCard";
import { getAlternates } from "@/i18n/routing";
import { toUrlWithoutLocale } from "@/app/sources/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page(props: Props) {
  const { locale } = await props.params;
  const courses = coursesSource.pageTree[locale].children;

  const courseCards: Array<DefaultCard> = courses
    .filter((c: any) => c.index)
    .map(({ index, children }: any) => {
      const length = children.length;
      const url = toUrlWithoutLocale(index.url, locale);
      return {
        type: "blog",
        eyebrow: length > 0 && `${length} Lessons`,
        body: index.description,
        callToAction: {
          hierarchy: "link",
          size: "md",
          label: "Start Course",
          endIcon: "arrow-up-right",
          iconSize: "sm",
          url,
        },
        backgroundImage: {
          src: `/opengraph${url}`,
        },
        isFeatured: false,
      };
    });

  return <Courses courseCards={courseCards} />;
}

export async function generateMetadata(props: Props) {
  const { locale } = await props.params;
  return {
    title: "Developer Courses",
    description:
      "Learn Solana development with developer guides, from beginner to advanced. JavaScript, TypeScript, Rust, and more.",
    alternates: getAlternates("/developers/courses", locale),
  };
}
