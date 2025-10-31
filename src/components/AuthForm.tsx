"use client";
import { useState } from "react";
import { api } from "@/app/api/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = mode === "signup" ? "/signup" : "/login";
      await api.post(endpoint, form);
      await api.get("/posts", { withCredentials: true });
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg border border-gray-200 w-full max-w-md"
    >
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">
        {mode === "signup" ? "Criar Conta" : "Entrar"}
      </h1>

      {mode === "signup" && (
        <input
          type="text"
          placeholder="Nome de usuário"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:border-gray-900"
        />
      )}

      <input
        type="email"
        placeholder="E-mail"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:border-gray-900"
      />

      <input
        type="password"
        placeholder="Senha"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:border-gray-900"
      />

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded font-medium text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-900 hover:bg-gray-800"
        }`}
      >
        {loading ? "..." : mode === "signup" ? "Cadastrar" : "Entrar"}
      </button>

      <p className="text-center text-sm mt-4 text-gray-600">
        {mode === "signup" ? "Já tem uma conta?" : "Ainda não tem conta?"}{" "}
        <Link
          href={mode === "signup" ? "/login" : "/signup"}
          className="text-gray-900 underline"
        >
          {mode === "signup" ? "Entrar" : "Criar conta"}
        </Link>
      </p>
    </form>
  );
}
