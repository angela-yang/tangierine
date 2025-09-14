"use client";
import { useState } from "react";
import Link from "next/link";
import { FaHome, FaShoppingCart, FaUser, FaStore } from "react-icons/fa";

export default function HomeNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="fixed top-4 left-4 z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="bg-indigo-400 text-white p-3 rounded-full shadow-lg hover:bg-indigo-500 transition cursor-pointer">
        <FaHome size={24} />
      </button>

      {isOpen && (
        <div className="mt-2 bg-indigo-300 text-indigo-600 rounded-xl shadow-lg w-48 p-4 flex flex-col gap-3 cursor-pointer">
          <Link href="/" className="flex items-center gap-2 p-2 rounded-xl hover:bg-indigo-100 transition">
            <FaHome /> Home
          </Link>
          <Link href="/shop" className="flex items-center gap-2 p-2 rounded-xl hover:bg-indigo-100 transition">
            <FaStore /> Shop
          </Link>
          <Link href="/cart" className="flex items-center gap-2 p-2 rounded-xl hover:bg-indigo-100 transition">
            <FaShoppingCart /> Cart
          </Link>
          <Link href="/profile" className="flex items-center gap-2 p-2 rounded-xl hover:bg-indigo-100 transition">
            <FaUser /> Profile
          </Link>
        </div>
      )}
    </div>
  );
}
