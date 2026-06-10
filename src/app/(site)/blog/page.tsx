import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog | QuickConnext Building",
  description:
    "Approfondimenti su building automation, conformità BACS 2026, efficienza energetica e innovazione negli edifici intelligenti.",
};

export default function BlogPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col border border-brand-line bg-white overflow-hidden hover:border-brand-teal transition-colors duration-300"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col flex-1 p-7">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-teal">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-brand-stone">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <span className="text-xs text-brand-stone">{post.readTime}</span>
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-brand-navy leading-snug group-hover:text-brand-teal transition-colors">
                    {post.title}
                  </h2>
                  <p className="body-text text-brand-navy text-sm mt-3 flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="cta-link text-brand-teal mt-6"
                  >
                    Leggi l&apos;articolo
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
