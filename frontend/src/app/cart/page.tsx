"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import HomeNav from "../../components/HomeNav";
import ShopItem from "../../components/ShopItem";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imgSrc: string;
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Print 1", price: 15, quantity: 1, imgSrc: "/images/products/print.png" },
    { id: 2, name: "Commission", price: 25, quantity: 2, imgSrc: "/images/products/commission.png" },
    { id: 3, name: "Stickers", price: 10, quantity: 3, imgSrc: "/images/products/sticker.png" },
  ]);

  const increaseQuantity = (id: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

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

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[url('/images/bg.png')] bg-cover bg-center relative">
      <HomeNav />
      {/*<ShopItem label="Counter" imgSrc="/images/counter.png" width={200} positionX={40} positionY={60} offsetX={offset.x} offsetY={offset.y} depthX={0.5} depthY={0.6}/>*/}

      {/* Header */}
      <div className="text-center mb-6 pt-[5vh]">
        <h1 className="text-5xl font-bold text-gray-100 mb-3">Your Cart</h1>
        <p className="text-gray-200/80 text-xl">
          Ready to checkout?
        </p>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty!</p>
      ) : (
        <div className="relative flex justify-center items-end">
          {/* Cash Register */}
          <div className="absolute top-[2vh] w-[300px] md:w-[20vw] h-auto bg-[#7280A7] rounded-lg shadow-2xl p-4">
            <h1 className="font-bold text-lg text-gray-100 pb-4">Cash Register</h1>
            <div className="p-4 bg-white/30 rounded-lg">
              <span className="font-bold text-lg text-gray-800">Total:</span>
              <p className="font-bold text-xl text-gray-700 mt-2">${totalPrice.toFixed(2)}</p>
            </div>
            <button className="mt-5 w-full py-3 bg-[#EBC794] text-gray-700 font-semibold rounded-lg shadow hover:bg-[#C3CDE9] transition cursor-pointer">
              Checkout
            </button>
          </div>

          <div className="pt-[32vh] flex justify-center w-full">
            {/* Cart */}
            <div className="relative bg-[url('/images/cart1.png')] bg-cover bg-center w-full h-[60vh] bottom-0 max-w-7xl p-2">
              {/* Cart Items */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-10">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative flex flex-col items-center bg-[#EBC794] p-3 rounded-lg shadow-md transform transition-transform duration-300 group hover:-translate-y-1"
                    style={{ zIndex: cartItems.length - index }}
                  >
                    <Image
                      src={item.imgSrc}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-contain rounded-sm shadow-inner"
                    />
                    {/* Quantity Buttons */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-[#CB9861] px-3 py-1 rounded hover:bg-[#EBC794] transition"
                      >
                        -
                      </button>
                      <span className="font-semibold text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-[#CB9861] px-3 py-1 rounded hover:bg-[#EBC794] transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Name and Price */}
                    <div className="mt-2 text-center">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-gray-700">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
