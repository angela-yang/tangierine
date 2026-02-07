"use client";
import React, { useState, useEffect } from "react";
import HomeNav from "../../components/HomeNav";
import ShopItem from "../../components/ShopItem";
import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function Commission() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", details: "" });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
    
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX - innerWidth / 2) / innerWidth) * -30;
      const y = ((e.clientY - innerHeight / 2) / innerHeight) * -30;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    // Redirect to login if not authenticated
    if (!user) {
      router.push('/login');
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('commissions')
        .insert([{
          user_id: user.id,
          name: form.name,
          email: form.email,
          details: form.details,
          status: 'pending'
        }]);

      if (error) throw error;

      setMessage("Commission submitted successfully! We'll get back to you soon. ✨");
      setForm({ name: "", email: "", details: "" });
    } catch (err: any) {
      console.error('Commission error:', err);
      setMessage("Failed to submit commission. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/images/bg.png')] bg-cover bg-center pt-24 relative overflow-hidden">
      <div className="hidden md:flex pointer-events-none fixed inset-0 border-[30px] border-[#3E1F69] z-10" />
      <HomeNav />
      
      <div className="max-w-md mx-auto p-6 bg-indigo-50 shadow-lg rounded-2xl relative z-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Request a Commission
        </h2>

        {!authLoading && !user && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-xl mb-4">
            <p className="text-sm">
              Please{' '}
              <a href="/login" className="underline font-semibold hover:text-yellow-900">
                log in
              </a>{' '}
              or{' '}
              <a href="/signup" className="underline font-semibold hover:text-yellow-900">
                sign up
              </a>{' '}
              to submit a commission request.
            </p>
          </div>
        )}

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
            className="border p-2 rounded-xl border-gray-400 disabled:bg-gray-100"
            required
            disabled={!user}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded-xl border-gray-400 disabled:bg-gray-100"
            required
            disabled={!user}
          />
          <textarea
            name="details"
            placeholder="Describe your commission (style, size, deadline, reference images, etc.)"
            value={form.details}
            onChange={handleChange}
            className="border p-2 rounded-xl h-32 border-gray-400 disabled:bg-gray-100"
            required
            disabled={!user}
          />
          <button
            type="submit"
            disabled={!user || submitting}
            className="bg-indigo-400 text-gray-900 p-2 rounded-full hover:bg-indigo-300 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Commission'}
          </button>
          
          {message && (
            <div className={`p-3 rounded-xl text-sm text-center ${
              message.includes('success') 
                ? 'bg-green-100 text-green-800 border border-green-400' 
                : 'bg-red-100 text-red-800 border border-red-400'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>

      <img
        src="/images/frog.png"
        alt="Decorative frog"
        className="w-[200px] md:w-[15vw] absolute top-[48vh] left-[20vw] md:left-[28vw] hover:scale-105 transition duration-500 z-30 pointer-events-none"
      />
      <ShopItem 
        label="Lights" 
        imgSrc="/images/light1.png" 
        width={50} 
        positionX={30} 
        positionY={8} 
        offsetX={offset.x} 
        offsetY={offset.y} 
        depthX={1.0} 
        depthY={1.0}
      />
      <ShopItem 
        label="Light" 
        imgSrc="/images/light2.png" 
        width={50} 
        positionX={85} 
        positionY={5} 
        offsetX={offset.x} 
        offsetY={offset.y} 
        depthX={1.0} 
        depthY={1.0}
      />
    </div>
  );
}