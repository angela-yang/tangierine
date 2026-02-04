"use client";

import { useState, useEffect } from 'react';
import HomeNav from "../../components/HomeNav"
import ShopItem from '../../components/ShopItem';

const products = [
  { id: 1, name: "Digital Commission", price: 20, image: "/images/products/commission.png", shelf: 1 },
  { id: 2, name: "Print — Small", price: 10, image: "/images/products/print.png", shelf: 1 },
  { id: 3, name: "Print — Large", price: 15, image: "/images/products/print.png", shelf: 1 },
  { id: 4, name: "Sticker Pack", price: 5, image: "/images/products/sticker.png", shelf: 2 },
  { id: 5, name: "Blind Pack", price: 15, image: "/images/products/blind.png", shelf: 2 },
  { id: 6, name: "Print — Small", price: 10, image: "/images/products/print.png", shelf: 2 },
  { id: 7, name: "Print — Large", price: 15, image: "/images/products/print.png", shelf: 3 },
  { id: 8, name: "Sticker Pack", price: 5, image: "/images/products/sticker.png", shelf: 3 },
  { id: 9, name: "Blind Pack", price: 15, image: "/images/products/blind.png", shelf: 3 },
]

export default function Shop() {
  const shelves = [1, 2, 3]

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

  return (
    <div className="absolute bg-[url('/images/bg.png')] bg-cover bg-center w-full h-[125vh] overflow-hidden">
      <div className="hidden md:flex pointer-events-none fixed inset-0 border-[30px] border-[#3E1F69] z-10" />
      <HomeNav />
      <div
        className={`absolute transition-transform -translate-x-1/2 -translate-y-1/2`}
        style={{
            left: `calc(${29}% + ${offset.x * 0.9}px)`,
            top: `calc(${80}% + ${offset.y * 1.2}px)`,
        }}
        ><img
            src={"/images/floor.png"}
            alt={"Floor"}
            className="object-contain"
            style={{ maxWidth: `160%` }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-14 pt-[70px]">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-100 mb-3">Capsule Toy</h1>
          <p className="text-gray-200/80 text-xl">
            Take a gamble!
          </p>
        </div>

        {/* Capsule Machine */}
        <div className="relative space-y-28">
          
        </div>
        <ShopItem label="Lights" imgSrc="/images/light1.png" width={50} positionX={30} positionY={8} offsetX={offset.x} offsetY={offset.y} depthX={1.0} depthY={1.0}/>
        <ShopItem label="Light" imgSrc="/images/light2.png" width={50} positionX={85} positionY={5} offsetX={offset.x} offsetY={offset.y} depthX={1.0} depthY={1.0}/>
      </div>
    </div>
  )
}
