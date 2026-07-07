import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPostCta } from "@/components/blog/BlogPostCta";
import { BlogRelatedPosts } from "@/components/blog/BlogRelatedPosts";
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Articolo non trovato" };
  return {
    title: `${post.title} | QuickConnext Building`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedBlogPosts(post.id, post.categoryIds, 3);

  return (
    <main className="min-h-screen">
      <section className="relative py-32 section-dark noise-texture dot-grid-dark text-white overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-brand-teal-light hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Torna al blog
          </Link>
          <h1 className="heading-h2-dark mt-4">{post.title}</h1>
          <span className="section-label">{post.category}</span>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {post.date}
            </span>
            <span>{post.readTime} di lettura</span>
          </div>
        </div>
      </section>

      {post.image && (
        <div className="relative -mt-8 max-w-4xl mx-auto px-6 md:px-12">
          <div className="relative aspect-[16/9] overflow-hidden border border-brand-line">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        </div>
      )}

      <section className="py-20 section-light">
        <article
          className="max-w-3xl mx-auto px-6 md:px-12 body-text text-brand-navy wp-content space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>

      <BlogRelatedPosts posts={relatedPosts} />
      <BlogPostCta />
    </main>
  );
}
