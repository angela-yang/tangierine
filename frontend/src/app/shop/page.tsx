"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HomeNav from "../../components/HomeNav";
import ShopItem from '../../components/ShopItem';
import ProductCard from '../../components/ProductCard';
import { FaShoppingCart } from 'react-icons/fa';

const products = [
  { id: 1, name: "Digital Commission", price: 20, image: "/images/products/commission.png", shelf: 1, description: "Custom digital artwork created just for you!" },
  { id: 2, name: "Print — Small", price: 10, image: "/images/products/print.png", shelf: 1, description: "High-quality small print (8x10 inches)" },
  { id: 3, name: "Print — Large", price: 15, image: "/images/products/print.png", shelf: 1, description: "High-quality large print (11x14 inches)" },
  { id: 4, name: "Design Commission", price: 5, image: "/images/products/design.png", shelf: 2, description: "Help with branding or designs!" },
  { id: 5, name: "Blind Pack", price: 15, image: "/images/products/blind.png", shelf: 2, description: "Mystery item!" },
  { id: 6, name: "Print — Small", price: 10, image: "/images/products/print.png", shelf: 2, description: "High-quality small print (8x10 inches)" },
  { id: 7, name: "Derpy Sticker", price: 4, image: "/images/products/derpy.png", shelf: 3, description: "Derpy!" },
  { id: 8, name: "Pokemon Stickers", price: 10, image: "/images/products/pokemon2.png", shelf: 3, description: "Catch em all!" },
  { id: 9, name: "Appa Sticker", price: 4, image: "/images/products/stickers.png", shelf: 3, description: "Appa!" },
];

export default function Shop() {
  const shelves = [1, 2, 3];
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  
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
      
      {/* Cart Link */}
      <Link 
        href="/cart"
        className="fixed top-15 right-15 z-50 bg-[#7280A7] hover:bg-[#3F548D] text-white px-4 py-2 rounded-full font-semibold shadow-lg transition"
      >
        <FaShoppingCart size={24} />
      </Link>

      <div
        className={`absolute transition-transform -translate-x-1/2 -translate-y-1/2`}
        style={{
          left: `calc(${29}% + ${offset.x * 0.9}px)`,
          top: `calc(${80}% + ${offset.y * 1.2}px)`,
        }}
      >
        <img
          src={"/images/floor.png"}
          alt={"Floor"}
          className="object-contain"
          style={{ maxWidth: `160%` }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-14 pt-[70px]">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-100 mb-3">Our Products</h1>
          <p className="text-gray-200/80 text-xl">
            Pick something off the shelf ✿
          </p>
        </div>

        {/* Shelves */}
        <div className="relative space-y-28">
          <div className="w-full h-full bg-[#915E35] pt-5 p-5 rounded-md border-[3px] border-[#5A341C]">
            <div className="bg-[#915E35] border-[5px] border-[#5A341C] rounded-lg">
              {shelves.map((level) => (
                <div key={level} className="relative">
                  {/* Products on this shelf */}
                  <div className="relative z-5 grid grid-cols-1 sm:grid-cols-3 gap-10 py-7 pr-9">
                    {products
                      .filter((p) => p.shelf === level)
                      .map((p) => (
                        <div
                          key={p.id}
                          className="group flex flex-col items-center relative cursor-pointer"
                          onClick={() => setSelectedProduct(p)}
                        >
                          {/* Product */}
                          <div className="bg-[#F1EBE3] p-2 shadow-lg hover:shadow-xl transition-transform duration-500 hover:scale-105">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="max-h-[160px] object-contain"
                              loading="lazy"
                            />
                          </div>

                          {/* Price Tag / Card */}
                          <div className="absolute -top-4 right-0 flex flex-col items-center">
                            {/* String */}
                            <div className="w-px h-10 bg-gray-200"></div>

                            {/* Tag */}
                            <div className="bg-[#F1EBE3] border border-gray-400 px-3 py-1 rounded-md shadow-md text-center group-hover:bg-indigo-100 transition">
                              <h3 className="text-sm font-semibold text-gray-800">{p.name}</h3>
                              <p className="text-xs text-gray-600">${p.price}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Shelf plank (background) */}
                  <div className="absolute left-0 right-0 bottom-0 h-6 bg-[#a06a3f] border-[2px] border-[#5A341C] rounded-md shadow-xl" />
                  <div className="absolute left-0 right-0 bottom-[-6px] h-2 bg-[#5c351c] border-[2px] border-[#5A341C] rounded-b-md shadow-inner" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <ShopItem label="Lights" imgSrc="/images/light1.png" width={50} positionX={30} positionY={8} offsetX={offset.x} offsetY={offset.y} depthX={1.0} depthY={1.0}/>
        <ShopItem label="Light" imgSrc="/images/light2.png" width={50} positionX={85} positionY={5} offsetX={offset.x} offsetY={offset.y} depthX={1.0} depthY={1.0}/>
      </div>

      {/* Product Card Modal */}
      {selectedProduct && (
        <ProductCard 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}