"use client";

import { useState } from "react";
import Image from "next/image";
import NavBar from "../../components/NavBar"

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

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-indigo-200 p-8">
      <NavBar />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty!</p>
      ) : (
        <div className="flex flex-col gap-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-indigo-100 rounded-lg p-4 shadow-md">
              <Image src={item.imgSrc} alt={item.name} width={80} height={80} className="rounded" />
              <div className="flex-1">
                <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-indigo-400 px-3 py-1 rounded hover:bg-indigo-300 transition"
                >
                  -
                </button>
                <span className="text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-indigo-400 px-3 py-1 rounded hover:bg-indigo-300 transition"
                >
                  +
                </button>
              </div>
              <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4 p-4 bg-indigo-100 rounded-lg shadow-md">
            <span className="font-bold text-xl text-gray-800">Total:</span>
            <span className="font-bold text-xl text-gray-800">${totalPrice.toFixed(2)}</span>
          </div>

          <button className="mt-4 py-3 bg-indigo-400 text-white font-semibold rounded-lg shadow hover:bg-indigo-500 transition cursor-pointer">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}