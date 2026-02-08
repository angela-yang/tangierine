
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';
import HomeNav from '../../components/HomeNav';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type CartItem = {
  id: string;
  product_id: number;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
};

export default function Cart() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchCart();
    }
  }, [user, authLoading, router]);

  const fetchCart = async () => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCartItems(data || []);
    } catch (err) {
      console.error('Cart fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await removeItem(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (error) throw error;
      fetchCart();
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update quantity');
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      fetchCart();
    } catch (err) {
      console.error('Remove error:', err);
      alert('Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setCheckingOut(true);

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user!.id,
          cartItems: cartItems,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      alert('Failed to start checkout: ' + err.message);
      setCheckingOut(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[url('/images/bg.png')] bg-cover bg-center flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-[url('/images/bg.png')] bg-cover bg-center pb-10">
      <div className="hidden md:flex pointer-events-none fixed inset-0 border-[30px] border-[#3E1F69] z-10" />
      <HomeNav />

      <div className="max-w-4xl mx-auto px-6 relative z-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Shopping Cart</h1>
          <Link
            href="/shop"
            className="bg-[#7280A7] text-white px-6 py-2 font-semibold rounded-full hover:bg-[#5D71A8] transition cursor-pointer"
          >
            ← Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 text-center">
            <p className="text-gray-600 text-xl mb-4">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-block bg-[#7280A7] text-white px-6 py-3 font-semibold rounded-full hover:bg-[#5D71A8] transition cursor-pointer"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 mb-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <Image
                      src={item.product_image}
                      alt={item.product_name}
                      width={80}
                      height={80}
                      className="rounded-lg object-contain bg-white p-2"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{item.product_name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-500 rounded-lg font-bold cursor-pointer"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-600">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-500 rounded-lg font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="w-24 text-right">
                      <p className="font-bold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-xl cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full bg-[#56699C] hover:bg-[#3F548D] text-white font-bold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {checkingOut ? 'Redirecting to Stripe...' : 'Proceed to Checkout'}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure payment powered by Stripe
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}