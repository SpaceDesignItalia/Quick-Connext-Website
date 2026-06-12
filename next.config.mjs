/** @type {import('next').NextConfig} */
const remotePatterns = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/**",
  },
];

const wordpressApiUrl = process.env.WORDPRESS_API_URL;
if (wordpressApiUrl) {
  try {
    const { hostname, protocol } = new URL(wordpressApiUrl);
    remotePatterns.push({
      protocol: protocol.replace(":", ""),
      hostname,
      pathname: "/**",
    });
  } catch {
    // URL non valida: le immagini WordPress remote non saranno abilitate
  }
}

const nextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
