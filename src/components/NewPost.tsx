"use client";
import { useState } from "react";
import { api } from "@/app/api/client";

export default function NewPost({
  onPostCreated,
}: {
  onPostCreated: () => void;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePost = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setError("");
    try {
      await api.post("/posts", { content });
      setContent("");
      onPostCreated();
    } catch (err: any) {
      if (err.response?.status === 401) window.location.href = "/login";
      else setError("Erro ao criar post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 transition-all hover:shadow-lg">
      <textarea
        rows={3}
        placeholder="O que está acontecendo?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#1DA1F2]"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <div className="flex justify-end mt-3">
        <button
          disabled={loading}
          onClick={handlePost}
          className={`px-5 py-2 rounded-full font-semibold text-white transition-colors ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-[#1DA1F2] hover:bg-[#0d8ddb]"
          }`}
        >
          {loading ? "Postando..." : "Postar"}
        </button>
      </div>
    </div>
  );
}
