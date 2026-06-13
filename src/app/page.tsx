import { getBlogPosts } from "@/lib/wordpress";
import HomePage from "./HomePage";

export const dynamic = "force-dynamic";

export default async function Page() {
  const blogPosts = await getBlogPosts(4);
  return <HomePage blogPosts={blogPosts} />;
}
