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
      className="bg-white p-16 rounded-2xl shadow-xl border border-gray-200 w-full max-w-xl"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        {mode === "signup" ? "Criar Conta" : "Entrar"}
      </h1>

      {mode === "signup" && (
        <input
          type="text"
          placeholder="Nome de usuário"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-4 mb-4 text-lg focus:outline-none focus:border-gray-900"
        />
      )}

      <input
        type="email"
        placeholder="E-mail"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full border-2 border-gray-300 rounded-lg px-4 py-4 mb-4 text-lg focus:outline-none focus:border-gray-900"
      />

      <input
        type="password"
        placeholder="Senha"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full border-2 border-gray-300 rounded-lg px-4 py-4 mb-4 text-lg focus:outline-none focus:border-gray-900"
      />

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-lg font-semibold text-lg text-white transition cursor-pointer ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-900 hover:bg-gray-800"
        }`}
      >
        {loading ? "..." : mode === "signup" ? "Cadastrar" : "Entrar"}
      </button>

      <p className="text-center text-base mt-6 text-gray-600">
        {mode === "signup" ? "Já tem uma conta?" : "Ainda não tem conta?"}{" "}
        <Link
          href={mode === "signup" ? "/login" : "/signup"}
          className="text-gray-900 font-medium underline"
        >
          {mode === "signup" ? "Entrar" : "Criar conta"}
        </Link>
      </p>
    </form>
  );
}
