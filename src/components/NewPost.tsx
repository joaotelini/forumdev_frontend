"use client";
import { useState } from "react";
import { api } from "@/app/api/client";
import { Spinner } from "./ui/spinner";
import type { PostFormType } from "@/types/PostType";

export default function NewPost({
  onPostCreated,
}: {
  onPostCreated: () => void;
}) {
  const [post, setPost] = useState<PostFormType>({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePost = async () => {
    if (!post.title.trim() || !post.content.trim()) {
      setError("Título e conteúdo são obrigatórios");
      return;
    }

    if (post.title.length > 100) {
      setError("Título deve ter menos de 100 caracteres");
      return;
    }

    if (post.content.length > 1000) {
      setError("Conteúdo deve ter menos de 1000 caracteres");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/posts", { title: post.title, content: post.content });

      setPost({ title: "", content: "" });

      onPostCreated();
    } catch (err: any) {
      if (err.status === 401) {
        setError("Realize o login para criar um post");
        setTimeout(() => (window.location.href = "/login"), 1000);
      } else {
        setError("Erro ao criar post. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl w-full shadow-md p-4 transition-all hover:shadow-lg">
      <form action="">
        <input
          maxLength={100}
          required
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="Título do post"
          className="w-full p-2 mb-4 border border-gray-200 rounded-lg  text-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
        />

        <textarea
          maxLength={1000}
          required
          rows={3}
          placeholder="Conteúdo do post"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </form>

      <div className="flex justify-end mt-3">
        <button
          disabled={loading}
          onClick={handlePost}
          className={`px-5 py-2 flex items-center justify-center rounded-full font-semibold text-white transition-colors cursor-pointer ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-[#1DA1F2] hover:bg-[#0d8ddb]"
          }`}
        >
          {loading ? <Spinner className="w-6 h-6 animate-spin" /> : "Postar"}
        </button>
      </div>
    </div>
  );
}
