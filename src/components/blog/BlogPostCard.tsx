import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { cn } from "@/lib/utils";

type Props = {
  post: BlogPost;
  className?: string;
};

export function BlogPostCard({ post, className }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`Leggi l'articolo: ${post.title}`}
      className={cn(
        "group flex h-full w-full cursor-pointer flex-col rounded-2xl border border-brand-line bg-white overflow-hidden shadow-sm transition-all duration-300 hover:border-brand-teal hover:shadow-md hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-slate-100 via-white to-brand-teal/10">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-teal/70">
              {post.category}
            </span>
            <span className="font-serif text-2xl font-semibold text-brand-navy/15 leading-none select-none">
              QC
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-teal">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-brand-stone">
            <Calendar size={12} />
            {post.date}
          </span>
          <span className="text-xs text-brand-stone">{post.readTime}</span>
        </div>

        <h2 className="font-serif text-xl font-semibold text-brand-navy leading-snug transition-colors group-hover:text-brand-teal">
          {post.title}
        </h2>

        <p className="body-text mt-3 text-sm text-brand-navy/80 line-clamp-4">
          {post.excerpt}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-brand-teal transition-all group-hover:gap-3 group-hover:text-brand-navy">
          Leggi l&apos;articolo
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
