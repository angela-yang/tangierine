"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage("Error: " + data.error);
        return;
      }

      localStorage.setItem("userId", data.id);
      setMessage(`Login successful! Welcome, ${data.username}`);
      setEmail("");
      setPassword("");
      router.push("/profile");
    } catch (err: any) {
      console.error(err);
      setMessage("Error: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-[url('/images/bg.png')] bg-cover bg-center flex items-center justify-center">
      <div className="bg-indigo-50 rounded-xl shadow-xl p-16 w-[90vw] max-w-[500px] justify-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Log In</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-gray-700">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-400 rounded-xl"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-gray-400 rounded-xl"
                required
            />
            <button type="submit" className="bg-indigo-500 text-white p-2 rounded-2xl cursor-pointer">
                Log In
            </button>
            {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}
