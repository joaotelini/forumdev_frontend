"use client";
import { useEffect, useState } from "react";
import { api } from "./api/client";
import NewPost from "@/components/NewPost";
import PostCard from "@/components/PostCard";
import { Spinner } from "@/components/ui/spinner";

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
      if (posts.length === 0) setError("Nenhum post encontrado, faça um post!");
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
    return <Spinner className="p-3" />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 p-8">
      <div className="w-full max-w-2xl flex flex-col justify-center items-center space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          ForumDev
        </h1>
        <NewPost onPostCreated={fetchPosts} />
        {error && <p className="text-center">{error}</p>}
        <div className="w-full h-full space-y-4">
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
    </div>
  );
}
