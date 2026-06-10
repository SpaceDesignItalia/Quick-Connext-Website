import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
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

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/hotel" ? 0.9 : 0.7,
  }));
}
