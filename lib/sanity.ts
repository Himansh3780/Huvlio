import { createClient } from "sanity";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function getBlogPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    author,
    publishedAt,
    image,
    category
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    author,
    publishedAt,
    image,
    category
  }`;

  try {
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function getBlogCategories() {
  const query = `*[_type == "post"] { category } | unique(@) | sort(@)`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
