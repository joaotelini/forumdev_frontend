"use client";

import { useState, useEffect, ReactNode } from "react";

const generateRandomGradient = () => {
  const colors = ["#FF5E5B", "#8C4989", "#1A1F71"];
  const shuffled = [...colors].sort(() => Math.random() - 0.5);
  const angle = Math.floor(Math.random() * 360);

  return `linear-gradient(${angle}deg, ${shuffled[0]} 0%, ${shuffled[1]} 50%, ${shuffled[2]} 100%)`;
};

export default function AuthPage({ children }: { children: ReactNode }) {
  const [gradient, setGradient] = useState("");

  useEffect(() => {
    setGradient(generateRandomGradient());
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-gray-300">
      <div
        className="w-full flex flex-col justify-center items-center"
        style={{ background: gradient }}
      >
        <h1 className="font-bold text-5xl mb-12 text-white">ForumDev</h1>
        {children}
      </div>
    </div>
  );
}
