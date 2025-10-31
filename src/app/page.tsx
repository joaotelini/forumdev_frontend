"use client";
import { useEffect, useState } from "react";
import { api } from "./api/client";
import NewPost from "@/components/NewPost";
import PostCard from "@/components/PostCard";

interface Post {
  post_id: string;
  post_title: string;
  post_content: string;
  post_created_at: string;
  user_id: string;
  user_username: string;
  comment_count: number;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts", { withCredentials: true });
      setPosts(res.data.posts || []);
    } catch (err: any) {
      setError("Erro ao carregar posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Carregando...</p>;
  }

  return (
    <div className="w-full max-w-2xl space-y-6 ">
      <div>
        <h1 className="text-3xl font-bold text-center text-gray-900">Home</h1>
      </div>
      <NewPost onPostCreated={fetchPosts} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="space-y-4">
        {posts
          .sort(
            (a, b) =>
              new Date(b.post_created_at).getTime() -
              new Date(a.post_created_at).getTime()
          )
          .map((post) => (
            <PostCard key={post.post_id} post={post} />
          ))}
      </div>
    </div>
  );
}
