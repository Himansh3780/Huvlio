import { getBlogPosts } from '@/lib/sanity';
import { BlogCard } from '@/components/BlogCard';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Blog</h1>
      <p className="text-gray-600 mb-12">Tips, strategies, and success stories</p>
      
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
