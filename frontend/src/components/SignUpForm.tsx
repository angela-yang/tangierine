"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      const data = await res.json();
      localStorage.setItem("userId", data.id);
      setMessage("Account created! ID: " + data.id);
      setUsername("");
      setEmail("");
      setPassword("");
      router.push("/profile");
    } catch (err: any) {
      console.error(err);
      setMessage("Error: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-indigo-200 flex items-center justify-center">
      <div className="bg-indigo-50 p-16 rounded-xl shadow-md w-[90vw] max-w-[500px] h-auto">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Create Account</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full text-gray-700">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 border border-gray-400 rounded-xl"
                required
            />
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
            <button type="submit" className="bg-indigo-500 text-white p-2 rounded-xl hover:bg-indigo-600 cursor-pointer">
                Sign Up
            </button>
            {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}

