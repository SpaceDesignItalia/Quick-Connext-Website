import { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/wordpress";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://quickconnext.eu";

  const routes = [
    "",
    "/hotel",
    "/industry",
    "/rsa",
    "/building",
    "/progetti",
    "/blog",
    "/chi-siamo",
    "/contatti",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/hotel" ? 0.9 : 0.7,
  }));

  const slugs = await getAllBlogSlugs();
  const blogEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
