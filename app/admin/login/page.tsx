"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Contraseña incorrecta");
    }
  }

  return (
    <main className="bg-cream min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs bg-charcoal/0"
      >
        <h1 className="font-display text-charcoal text-3xl tracking-logo mb-6 text-center">
          gozart
        </h1>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-sand bg-cream px-3 py-2.5 text-sm mb-3 text-charcoal outline-none focus:border-charcoal"
          autoFocus
        />
        {error && <p className="text-xs text-red-700 mb-3">{error}</p>}
        <button
          type="submit"
          className="w-full bg-charcoal text-cream py-2.5 text-sm hover:bg-graphite transition-colors"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
