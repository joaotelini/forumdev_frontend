"use client";

interface PostProps {
  post: {
    post_id: string;
    post_title: string;
    post_content: string;
    post_created_at: string;
    user_username: string;
  };
}

export default function PostCard({ post }: PostProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-800">
          {post.user_username}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(post.post_created_at).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <h3 className="font-medium text-gray-900 mb-1">{post.post_title}</h3>
      <p className="text-gray-700 text-sm">{post.post_content}</p>
    </div>
  );
}
