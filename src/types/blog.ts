export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryIds: number[];
  date: string;
  readTime: string;
  image: string | null;
};

export type BlogPostDetail = BlogPost & {
  content: string;
};
