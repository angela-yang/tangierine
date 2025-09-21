"use client";
import { useState } from "react";
import Link from "next/link";
import { FaHome, FaShoppingCart, FaUser, FaStore } from "react-icons/fa";
import Dialogue from "./Dialogue";

export default function HomeNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="fixed top-4 left-4 z-50"
            onMouseEnter={() => {
                setIsOpen(true);
                setHovered(true);
            }}
            onMouseLeave={() => {
                setIsOpen(false);
                setHovered(false);
            }}
        >
            <button className="bg-[rgb(235,199,148)] text-[rgb(47,54,103)] p-3 rounded-full shadow-lg hover:bg-[rgb(89,102,154)] transition cursor-pointer">
                <FaHome size={24} />
            </button>

            {isOpen && (
                <div className="mt-2 bg-[rgb(34,35,76)] text-[rgb(232,215,194)] rounded-xl shadow-lg w-48 p-4 flex flex-col gap-3 cursor-pointer">
                <Link href="/" className="flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(47,54,103)] transition">
                    <FaHome /> Home
                </Link>
                <Link href="/shop" className="flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(47,54,103)] transition">
                    <FaStore /> Shop
                </Link>
                <Link href="/cart" className="flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(47,54,103)] transition">
                    <FaShoppingCart /> Cart
                </Link>
                <Link href="/profile" className="flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(47,54,103)] transition">
                    <FaUser /> Profile
                </Link>
                </div>
            )}

            {hovered && (
                <Dialogue
                text="Here's a simpler way to navigate my shop!"
                speed={40}
                className={"w-60"}
                style={{left: "122%", top: "60%",}}
                />
            )}
        </div>
    );
}
