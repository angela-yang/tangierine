"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '../app/lib/supabase';
import { useAuth } from '../app/lib/AuthContext';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
};

type Review = {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  users?: {
    username: string;
  };
};

interface ProductCardProps {
  product: Product;
  onClose: () => void;
}

export default function ProductCard({ product, onClose }: ProductCardProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchReviews();
  }, [product.id]);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select(`
        *,
        users (username)
      `)
      .eq('product_id', product.id)
      .order('created_at', { ascending: false });
    
    setReviews(data || []);
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please log in to add items to cart');
      return;
    }

    setAdding(true);

    try {
      // Check if item already in cart
      const { data: existing } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single();

      if (existing) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + quantity })
          .eq('id', existing.id);
        
        if (error) throw error;
      } else {
        // Insert new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            product_name: product.name,
            product_image: product.image,
            price: product.price,
            quantity: quantity
          });
        
        if (error) throw error;
      }

      alert('Added to cart!');
      onClose();
    } catch (err: any) {
      console.error('Cart error:', err);
      alert('Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!user) {
      alert('Please log in to leave a review');
      return;
    }

    if (!newReview.comment.trim()) {
      alert('Please write a comment');
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          product_id: product.id,
          rating: newReview.rating,
          comment: newReview.comment
        });

      if (error) throw error;

      setNewReview({ rating: 5, comment: '' });
      fetchReviews();
      alert('Review submitted!');
    } catch (err: any) {
      console.error('Review error:', err);
      alert('Failed to submit review');
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 'No ratings yet';

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Product Image */}
          <div className="bg-gray-100 p-6 rounded-2xl flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-4xl font-bold text-[#262757] mb-4">
                ${product.price}
              </p>
              <p className="text-gray-700 mb-4">
                {product.description || 'A wonderful product from Tangierine!'}
              </p>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  ⭐ {averageRating} ({reviews.length} reviews)
                </p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-700">Quantity:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-500 rounded-lg font-bold"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-semibold text-gray-600">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-500 rounded-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="w-full bg-[#7280A7] hover:bg-[#5D71A8] text-white font-bold py-3 rounded-xl transition disabled:opacity-50 cursor-pointer"
              >
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews</h3>
          
          {/* Review Form */}
          {user && (
            <div className="bg-gray-50 p-4 rounded-xl mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Leave a Review</h4>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm text-gray-600">Rating:</label>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="text-2xl"
                  >
                    {star <= newReview.rating ? '⭐' : '☆'}
                  </button>
                ))}
              </div>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Write your review..."
                className="w-full p-3 border border-gray-300 text-gray-600 rounded-lg mb-2 resize-none"
                rows={3}
              />
              <button
                onClick={handleSubmitReview}
                className="bg-[#7280A7] hover:bg-[#5D71A8] text-white px-4 py-2 rounded-lg font-semibold cursor-pointer"
              >
                Submit Review
              </button>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-sm">No reviews yet. Be the first!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {review.users?.username || 'Anonymous'}
                      </p>
                      <p className="text-sm text-yellow-500">
                        {'⭐'.repeat(review.rating)}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}