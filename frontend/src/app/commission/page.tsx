"use client";
import React, { useState } from "react";
import NavBar from "../../components/NavBar";

export default function Commission() {
  const [form, setForm] = useState({ name: "", email: "", details: "" });
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [authMessage, setAuthMessage] = useState("");
  const [message, setMessage] = useState("");

  // --- types for handlers ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setShowAuthPopup(true);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/commissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId }),
      });

      if (res.ok) {
        setMessage("Submission successful!");
        setForm({ name: "", email: "", details: "" });
      } else {
        setMessage("Submission failed. Try again.");
      }
    } catch {
      setMessage("Error submitting commission.");
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthMessage("");

    const endpoint = isLoginMode
      ? "http://localhost:3001/api/login"
      : "http://localhost:3001/api/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthMessage((data.error || "Authentication failed."));
        return;
      }

      if (data.id) {
        localStorage.setItem("userId", data.id);
        setAuthMessage("Logged in!");
        setShowAuthPopup(false);

        setTimeout(() => {
          const fakeEvent = new Event("submit", { bubbles: true });
          document
            .querySelector("form")
            ?.dispatchEvent(fakeEvent as unknown as Event);
        }, 300);
      } else {
        setAuthMessage("Login failed. Try again.");
      }
    } catch (err: any) {
      setAuthMessage((err.message || "Server error."));
    }
  };

  return (
    <div className="min-h-screen bg-indigo-200 pt-24 relative">
      <NavBar />

      <div className="max-w-md mx-auto p-6 bg-indigo-50 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Request a Commission
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 border-gray-700 text-gray-700"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded-xl border-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded-xl border-gray-400"
            required
          />
          <textarea
            name="details"
            placeholder="Describe your commission"
            value={form.details}
            onChange={handleChange}
            className="border p-2 rounded-xl h-32 border-gray-400"
          />
          <button
            type="submit"
            className="bg-indigo-400 text-gray-900 p-2 rounded-full hover:bg-indigo-300 transition-colors cursor-pointer"
          >
            Submit
          </button>
          {message && <p className="text-center mt-2">{message}</p>}
        </form>
      </div>

      {showAuthPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-[60vw] relative">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {isLoginMode ? "Log In" : "Create an Account"}
            </h2>
            <form
              onSubmit={handleAuthSubmit}
              className="flex flex-col gap-4 text-gray-700"
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={authForm.email}
                onChange={handleAuthChange}
                className="p-2 border border-gray-400 rounded-xl"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={authForm.password}
                onChange={handleAuthChange}
                className="p-2 border border-gray-400 rounded-xl"
                required
              />
              <button
                type="submit"
                className="bg-indigo-400 text-white p-2 rounded-3xl cursor-pointer hover:bg-indigo-300 transition"
              >
                {isLoginMode ? "Log In" : "Sign Up"}
              </button>
              {authMessage && (
                <p className="text-center text-sm mt-2">{authMessage}</p>
              )}
            </form>
            <p className="text-center text-gray-600 mt-4">
              {isLoginMode ? "Don't have an account?" : "Already have one?"}{" "}
              <span
                className="text-indigo-500 cursor-pointer hover:underline"
                onClick={() => setIsLoginMode(!isLoginMode)}
              >
                {isLoginMode ? "Create one" : "Log in"}
              </span>
            </p>
            <button
              onClick={() => setShowAuthPopup(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
