import type { Metadata } from "next";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogPostCta } from "@/components/blog/BlogPostCta";
import { getBlogPosts } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Blog | QuickConnext Building",
  description:
    "Approfondimenti su building automation, conformità BACS 2026, efficienza energetica e innovazione negli edifici intelligenti.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <main className="min-h-screen">
      <section className="relative py-32 section-dark noise-texture dot-grid-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">INSIGHTS & NOVITÀ</span>
            <h1 className="heading-h2-dark mt-4">Blog</h1>
            <p className="body-text text-slate-300 mt-6">
              Approfondimenti su building automation, normativa, efficienza
              energetica e casi d&apos;uso reali nel mondo hospitality,
              industriale e sanitario.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 section-light noise-texture dot-grid-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {blogPosts.length === 0 ? (
            <p className="body-text text-brand-navy">
              Nessun articolo disponibile al momento.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {blogPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <BlogPostCta />
    </main>
  );
}
