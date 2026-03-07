'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  category: string;
}

export function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={16} />
            {date}
          </div>
          <Link
            href={`/blog/${post.slug.current}`}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
