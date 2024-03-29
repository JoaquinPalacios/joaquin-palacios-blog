import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import { PostCard } from "@/components/PostCard";
import { RichText } from "@/components/RichText";
import { Navigation } from "@/components/Navigation";
import { getLocales } from "@/utils/getLocales";
import { Comments } from "@/components/Comments";

type Params = { uid: string; lang: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("blog_post", params.uid, { lang: params.lang }).catch(() => notFound());

  return {
    title: prismic.asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();

  // Fetch the current blog post page being displayed by the UID of the page
  const page = await client
    .getByUID("blog_post", params.uid, {
      lang: params.lang,
    })
    .catch(() => notFound());

  const locales = await getLocales(page, client);

  const currentLocale = locales.find((locale) => locale.lang === params.lang);

  /**
   * Fetch all of the blog posts in Prismic (max 2), excluding the current one, and ordered by publication date.
   *
   * We use this data to display our "recommended posts" section at the end of the blog post
   */
  const posts = await client.getAllByType("blog_post", {
    predicates: [prismic.filter.not("my.blog_post.uid", params.uid)],
    lang: params.lang,
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
    limit: 2,
  });

  // Destructure out the content of the current page
  const { slices, title, publication_date, description, featured_image } = page.data;

  return (
    <div className="flex flex-col gap-12 w-full max-w-3xl">
      <Navigation client={client} lang={params.lang} locales={locales} />

      {/* Display the "hero" section of the blog post */}
      <section className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="flex flex-col gap-6 items-center">
            <p className="opacity-75 w-fit pb-1">{new Date(publication_date || "").toLocaleDateString(currentLocale?.lang || "en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            <h1 className="text-center">
              <RichText field={title} />
            </h1>
          </div>
          <div className="text-center">
            <RichText field={description} />
          </div>
        </div>
        <PrismicNextImage field={featured_image} sizes="100vw" className="w-full max-w-3xl max-h-96 rounded-xl object-cover" />
      </section>

      {/* Display the content of the blog post */}
      <SliceZone slices={slices} components={components} />

      {/* Display the Comments section */}
      <Comments id={page.id} uid={page.uid} />

      {/* Display the Recommended Posts section using the posts we requested earlier */}
      <h3>Recommended Posts</h3>
      <section className="grid grid-cols-1 gap-8 max-w-3xl w-full">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} locales={locales} />
        ))}
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("blog_post", {
    lang: "*",
  });

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid, lang: page.lang };
  });
}
