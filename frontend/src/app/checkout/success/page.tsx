"use client";

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import HomeNav from '../../../components/HomeNav';

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      router.push('/cart');
      return;
    }

    // You could verify the session with Stripe here if needed
    setTimeout(() => setLoading(false), 1000);
  }, [sessionId, router]);

  if (loading) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[url('/images/bg.png')] bg-cover bg-center flex items-center justify-center">
          <p className="text-white text-xl">Processing your order...</p>
        </div>
      }>
      <SuccessContent />
      </Suspense>
    );
  }

  function SuccessContent() {
    return (
      <div className="min-h-screen pt-20 bg-[url('/images/bg.png')] bg-cover bg-center pb-10">
        <div className="hidden md:flex pointer-events-none fixed inset-0 border-[30px] border-[#3E1F69] z-10" />
        <HomeNav />

        <div className="max-w-2xl mx-auto px-6 relative z-20">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Payment Successful! 🎉
            </h1>

            <p className="text-gray-600 mb-8 text-lg">
              Thank you for your purchase! Your order has been confirmed and will be processed shortly.
            </p>

            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
              <h2 className="font-semibold text-gray-800 mb-2">What's Next?</h2>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>✓ Order confirmation sent to your email</li>
                <li>✓ You can view your order in your profile</li>
                <li>✓ We'll notify you when your order ships</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/profile"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                View My Orders
              </Link>
              <Link
                href="/shop"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-xl font-semibold transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}