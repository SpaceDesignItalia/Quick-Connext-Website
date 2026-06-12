import type { BlogPost, BlogPostDetail } from "@/types/blog";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

type WpRendered = { rendered: string };

type WpTerm = { id: number; name: string; slug: string; taxonomy: string };

type WpFeaturedMedia = { source_url: string };

type WpPost = {
  id: number;
  slug: string;
  categories: number[];
  title: WpRendered;
  excerpt: WpRendered;
  content: WpRendered;
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: WpFeaturedMedia[];
    "wp:term"?: WpTerm[][];
  };
};

function isWordPressConfigured(): boolean {
  return Boolean(WORDPRESS_API_URL);
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#x([\da-f]+);/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => {
      const entities: Record<string, string> = {
        amp: "&",
        lt: "<",
        gt: ">",
        quot: '"',
        apos: "'",
        nbsp: " ",
      };
      return entities[name.toLowerCase()] ?? match;
    });
}

function htmlToPlainText(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, "")).trim();
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function estimateReadTime(content: string): string {
  const words = htmlToPlainText(content).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

function getEmbeddedCategories(post: WpPost): WpTerm[] {
  return (
    post._embedded?.["wp:term"]?.flat().filter((term) => term.taxonomy === "category") ??
    []
  );
}

function getPrimaryCategoryId(post: WpPost): number | null {
  const embedded = getEmbeddedCategories(post);
  const preferred = embedded.find(
    (category) => category.slug !== "uncategorized" && category.id !== 1,
  );
  const primary = preferred ?? embedded[0];
  return primary?.id ?? post.categories[0] ?? null;
}

function getCategory(post: WpPost): string {
  const embedded = getEmbeddedCategories(post);
  const primaryId = getPrimaryCategoryId(post);
  const primary = embedded.find((category) => category.id === primaryId) ?? embedded[0];
  return primary ? htmlToPlainText(primary.name) : "Articolo";
}

function getFeaturedImage(post: WpPost): string | null {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
}

function mapWpPostToSummary(post: WpPost): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: htmlToPlainText(post.title.rendered),
    excerpt: htmlToPlainText(post.excerpt.rendered),
    category: getCategory(post),
    categoryIds: post.categories,
    date: formatDate(post.date),
    readTime: estimateReadTime(post.content.rendered),
    image: getFeaturedImage(post),
  };
}

function mapWpPostToDetail(post: WpPost): BlogPostDetail {
  return {
    ...mapWpPostToSummary(post),
    content: post.content.rendered,
  };
}

async function fetchFromWordPress<T>(path: string): Promise<T | null> {
  if (!WORDPRESS_API_URL) return null;

  try {
    const url = `${WORDPRESS_API_URL.replace(/\/$/, "")}${path}`;
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${url}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("WordPress fetch failed:", error);
    return null;
  }
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  const perPage = limit ?? 100;
  const posts = await fetchFromWordPress<WpPost[]>(
    `/posts?_embed&per_page=${perPage}&status=publish&orderby=date&order=desc`,
  );

  if (!posts?.length) return [];

  const summaries = posts.map(mapWpPostToSummary);
  return limit ? summaries.slice(0, limit) : summaries;
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPostDetail | null> {
  const posts = await fetchFromWordPress<WpPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed&status=publish`,
  );

  if (!posts?.[0]) return null;

  return mapWpPostToDetail(posts[0]);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((post) => post.slug);
}

export async function getRelatedBlogPosts(
  postId: number,
  categoryIds: number[],
  limit = 3,
): Promise<BlogPost[]> {
  const primaryCategoryId =
    categoryIds.find((id) => id !== 1) ?? categoryIds[0] ?? null;

  if (!primaryCategoryId) return [];

  const posts = await fetchFromWordPress<WpPost[]>(
    `/posts?_embed&per_page=${limit}&status=publish&orderby=date&order=desc&categories=${primaryCategoryId}&exclude=${postId}`,
  );

  if (!posts?.length) return [];

  return posts.map(mapWpPostToSummary);
}

export { isWordPressConfigured };
