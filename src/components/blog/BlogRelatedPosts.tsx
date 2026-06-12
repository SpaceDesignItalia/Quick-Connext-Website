import type { BlogPost } from "@/types/blog";
import { BlogPostCard } from "@/components/blog/BlogPostCard";

type Props = {
  posts: BlogPost[];
};

export function BlogRelatedPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <section className="py-20 section-light noise-texture dot-grid-light border-t border-brand-line">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-12">
          <span className="section-label">CONTINUA A LEGGERE</span>
          <h2 className="heading-h2-light mt-4 text-[28px] md:text-[36px]">
            Articoli correlati
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
