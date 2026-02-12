"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import HomeNav from "../../components/HomeNav";
import ShopItem from '../../components/ShopItem';
import { supabase } from '../../app/lib/supabase';
import { useAuth } from '../../app/lib/AuthContext';
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  type: 'sticker' | 'print' | 'blind-pack' | 'commission';
  collection: 'pokemon' | 'pikmin' | 'smiski' | 'misc';
  description: string;
};

type Review = {
  id: string;
  user_id: string;
  product_id: number;
  rating: number;
  comment: string;
  created_at: string;
  users?: {
    username: string;
  };
};

const products: Product[] = [
  // Pokemon
  { id: 1, name: "Pikachu Sticker", price: 4, image: "/images/products/pika.png", type: 'sticker', collection: 'pokemon', description: "Pika Hut" },
  { id: 2, name: "Mew Sticker", price: 4, image: "/images/products/mew.png", type: 'sticker', collection: 'pokemon', description: "Mountain Mew" },
  { id: 3, name: "Charmander Sticker", price: 4, image: "/images/products/char.png", type: 'sticker', collection: 'pokemon', description: "Charpotle" },
  { id: 4, name: "Wooper Sticker", price: 4, image: "/images/products/woopa.png", type: 'sticker', collection: 'pokemon', description: "Woopers" },
  
  // Pikmin
  { id: 5, name: "Yellow Pikmin", price: 4, image: "/images/products/pikmin2.png", type: 'sticker', collection: 'pikmin', description: "Yellow Pikmin!" },
  { id: 6, name: "Red Pikmin", price: 4, image: "/images/products/pikmin1.png", type: 'sticker', collection: 'pikmin', description: "Red Pikmin!" },
  { id: 7, name: "Blue Pikmin", price: 4, image: "/images/products/pikmin3.png", type: 'sticker', collection: 'pikmin', description: "Blue Pikmin!" },
  
  // Smiski
  { id: 8, name: "Sweater Smiski", price: 5, image: "/images/products/smiski1.png", type: 'sticker', collection: 'smiski', description: "Sweater smiski!" },
  { id: 9, name: "Scarf Smiski", price: 5, image: "/images/products/smiski2.png", type: 'sticker', collection: 'smiski', description: "Scarf smiski!" },
  
  // Misc
  { id: 10, name: "Derpy Cat", price: 4, image: "/images/products/derpy2.png", type: 'sticker', collection: 'misc', description: "Derpy!" },
  { id: 11, name: "Appa Sticker", price: 4, image: "/images/products/appa.png", type: 'sticker', collection: 'misc', description: "Yip yip!" },
  
  // Prints
  { id: 12, name: "Print — Small", price: 10, image: "/images/products/print.png", type: 'print', collection: 'misc', description: "High-quality 8x10" },
  { id: 13, name: "Print — Large", price: 15, image: "/images/products/print.png", type: 'print', collection: 'misc', description: "High-quality 11x14" },
  
  // Commissions
  { id: 14, name: "Digital Commission", price: 20, image: "/images/products/commission.png", type: 'commission', collection: 'misc', description: "Custom digital art!" },
  { id: 15, name: "Blind Pack", price: 15, image: "/images/products/blind.png", type: 'blind-pack', collection: 'misc', description: "Mystery item!" },
];

export default function Shop() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedCollection, setSelectedCollection] = useState<'all' | Product['collection']>('all');
  const [viewingStack, setViewingStack] = useState<Product[] | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Record<number, Review[]>>({});
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
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

  // Fetch all reviews on mount
  useEffect(() => {
    fetchAllReviews();
  }, []);

  // Keyboard nav
  useEffect(() => {
    if (!viewingStack) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevCard();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextCard();
      } else if (e.key === 'Escape') {
        if (isFlipped) {
          setIsFlipped(false);
        } else {
          closeViewer();
        }
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped(!isFlipped);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [viewingStack, currentCardIndex, isFlipped]);

  const fetchAllReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select(`
        *,
        users (username)
      `)
      .order('created_at', { ascending: false });
    
    if (data) {
      const reviewsByProduct: Record<number, Review[]> = {};
      data.forEach((review) => {
        if (!reviewsByProduct[review.product_id]) {
          reviewsByProduct[review.product_id] = [];
        }
        reviewsByProduct[review.product_id].push(review);
      });
      setReviews(reviewsByProduct);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent card flip
    
    if (!user) {
      alert('Please log in to add items to cart');
      return;
    }

    setAdding(true);

    try {
      const { data: existing } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single();

      if (existing) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + quantity })
          .eq('id', existing.id);
        
        if (error) throw error;
      } else {
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
      setQuantity(1); // Reset quantity
    } catch (err: any) {
      console.error('Cart error:', err);
      alert('Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  const handleSubmitReview = async (e: React.MouseEvent, productId: number) => {
    e.stopPropagation(); // Prevent card flip
    
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
          product_id: productId,
          rating: newReview.rating,
          comment: newReview.comment
        });

      if (error) throw error;

      setNewReview({ rating: 5, comment: '' });
      await fetchAllReviews();
      alert('Review submitted!');
    } catch (err: any) {
      console.error('Review error:', err);
      alert('Failed to submit review');
    }
  };

  const getAverageRating = (productId: number) => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 'No ratings yet';
    const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
    return avg.toFixed(1);
  };

  const filteredProducts = selectedCollection === 'all' 
    ? products 
    : products.filter(p => p.collection === selectedCollection);

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const key = product.collection;
    if (!acc[key]) acc[key] = [];
    acc[key].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const openStack = (stack: Product[], clickedProduct: Product) => {
    const startIndex = stack.findIndex(p => p.id === clickedProduct.id);
    setViewingStack(stack);
    setCurrentCardIndex(startIndex >= 0 ? startIndex : 0);
    setIsFlipped(false);
    setQuantity(1);
  };

  const closeViewer = () => {
    setViewingStack(null);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setQuantity(1);
  };

  const nextCard = () => {
    if (viewingStack) {
      // Loop back to beginning
      setCurrentCardIndex(prev => (prev + 1) % viewingStack.length);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (viewingStack) {
      // Loop to end
      setCurrentCardIndex(prev => (prev - 1 + viewingStack.length) % viewingStack.length);
      setIsFlipped(false);
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="absolute bg-[url('/images/bg.png')] bg-cover bg-center w-full min-h-screen overflow-y-auto pb-20">
      <div className="hidden md:flex pointer-events-none fixed inset-0 border-[30px] border-[#3E1F69] z-10" />
      <HomeNav />
      
      <Link 
        href="/cart"
        className="fixed top-10 right-10 z-50 bg-[#7280A7] hover:bg-[#3F548D] text-white p-4 rounded-full font-semibold shadow-lg transition"
      >
        <FaShoppingCart size={24} />
      </Link>

      <div
        className="absolute transition-transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          left: `calc(${29}% + ${offset.x * 0.9}px)`,
          top: `calc(${70}% + ${offset.y * 1.2}px)`,
        }}
      >
        <img
          src="/images/floor.png"
          alt="Floor"
          className="object-contain"
          style={{ maxWidth: `160%` }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-14 pt-[90px] relative z-20">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-100 mb-3">Vendor Booth</h1>
          <p className="text-gray-200/80 text-xl">Browse our collections ✿</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button onClick={() => setSelectedCollection('all')} className={`bg-[#6F81AA] hover:bg-[#D16280] transition-all transform hover:scale-105 cursor-pointer rounded-full p-1 px-3 filter-btn ${selectedCollection === 'all' ? 'active' : ''}`}>All Collections</button>
          <button onClick={() => setSelectedCollection('pokemon')} className={`bg-[#6F81AA] hover:bg-[#D16280] transition-all transform hover:scale-105 cursor-pointer rounded-full p-1 px-3 filter-btn ${selectedCollection === 'pokemon' ? 'active' : ''}`}>Pokémon</button>
          <button onClick={() => setSelectedCollection('pikmin')} className={`bg-[#6F81AA] hover:bg-[#D16280] transition-all transform hover:scale-105 cursor-pointer rounded-full p-1 px-3 filter-btn ${selectedCollection === 'pikmin' ? 'active' : ''}`}>Pikmin</button>
          <button onClick={() => setSelectedCollection('smiski')} className={`bg-[#6F81AA] hover:bg-[#D16280] transition-all transform hover:scale-105 cursor-pointer rounded-full p-1 px-3 filter-btn ${selectedCollection === 'smiski' ? 'active' : ''}`}>Smiski</button>
          <button onClick={() => setSelectedCollection('misc')} className={`bg-[#6F81AA] hover:bg-[#D16280] transition-all transform hover:scale-105 cursor-pointer rounded-full p-1 px-3 filter-btn ${selectedCollection === 'misc' ? 'active' : ''}`}>Misc</button>
        </div>

        {/* Shelves */}
        <div className="space-y-12">
          {Object.entries(groupedProducts).map(([collectionName, collectionProducts]) => (
            <div key={collectionName}>
              <div className="relative bg-[#C88261] rounded-lg p-8 border-8 border-[#975736]">
                <div className="flex justify-center mb-6">
                  <div className="bg-[#F1EBE3] border-2 border-[#915E35] px-8 py-3 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 capitalize">
                      {collectionName} Collection
                    </h2>
                  </div>
                </div>

                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-16 bg-gradient-to-r from-gray-600 to-gray-400 rounded-r-lg shadow-lg"></div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-16 bg-gradient-to-l from-gray-600 to-gray-400 rounded-l-lg shadow-lg"></div>

                <div className="relative z-10 flex flex-wrap justify-center gap-6 px-4">
                  {collectionProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      className="group cursor-pointer relative"
                      onClick={() => openStack(collectionProducts, product)}
                      whileHover={{ y: -12, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{
                        transform: `rotate(${(index - collectionProducts.length / 2) * 3}deg)`
                      }}
                    >
                      <div className="w-32 h-32 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                        <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                          {product.name}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-px h-6 bg-gray-400"></div>
                  <div className="bg-yellow-100 border-2 border-yellow-600 px-6 py-2 rounded-md shadow-md">
                    <p className="text-sm font-bold text-gray-800 text-center">
                      {collectionProducts.length} Items
                    </p>
                    <p className="text-xs text-gray-600 text-center">
                      ${collectionProducts[0].price} each
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ShopItem label="Lights" imgSrc="/images/light1.png" width={50} positionX={30} positionY={8} offsetX={offset.x} offsetY={offset.y} depthX={1.0} depthY={1.0}/>
        <ShopItem label="Light" imgSrc="/images/light2.png" width={50} positionX={85} positionY={5} offsetX={offset.x} offsetY={offset.y} depthX={1.0} depthY={1.0}/>
      </div>

      {/* Card Stack Viewer */}
      <AnimatePresence>
        {viewingStack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={closeViewer}
          >
            <div className="relative max-w-4xl w-full h-[600px]" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeViewer}
                className="absolute -top-16 right-0 text-white hover:text-gray-300 text-4xl cursor-pointer z-50"
              >
                ✕
              </button>

              {/* Card Stack */}
              <div className="relative w-full h-full flex items-center justify-center">
                {viewingStack.map((card, index) => {
                  const isActive = index === currentCardIndex;
                  const offset = index - currentCardIndex;
                  const isBehind = offset < 0;
                  const productReviews = reviews[card.id] || [];
                  
                  return (
                    <motion.div
                      key={card.id}
                      className="absolute"
                      style={{
                        zIndex: isBehind ? index : viewingStack.length + 1 - index,
                        perspective: '1000px',
                        pointerEvents: isActive ? 'auto' : 'none',
                      }}
                      initial={false}
                      animate={{
                        x: offset * 30,
                        y: isBehind ? 20 : offset * 15,
                        scale: isActive ? 1 : 0.92 - Math.abs(offset) * 0.05,
                        rotateZ: offset * 4,
                        rotateY: offset * -5,
                        opacity: Math.abs(offset) > 3 ? 0 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                      onClick={isActive ? toggleFlip : undefined}
                    >
                      <motion.div
                        className="relative w-[450px] h-[550px]"
                        style={{ transformStyle: 'preserve-3d' }}
                        animate={{ rotateY: isActive && isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, type: "spring" }}
                      >
                        {/* FRONT */}
                        <div 
                          className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-8 flex flex-col"
                          style={{ 
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                          }}
                        >
                          <div className="flex-1 flex items-center justify-center mb-4">
                            <img
                              src={card.image}
                              alt={card.name}
                              className="max-w-[400px] max-h-[200px] px-10 object-contain drop-shadow-2xl"
                              style={{
                                filter: isActive ? 'none' : 'brightness(0.7)'
                              }}
                            />
                          </div>

                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-center"
                            >
                              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                {card.name}
                              </h3>
                              <p className="text-lg text-gray-600 mb-3">{card.description}</p>
                              <p className="text-3xl font-bold text-[#7280A7] mb-4">
                                ${card.price}
                              </p>

                              <div className="space-y-3">
                                <div className="flex items-center justify-center gap-3">
                                  <label className="text-sm font-semibold text-gray-700">Quantity:</label>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setQuantity(Math.max(1, quantity - 1));
                                      }}
                                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-bold cursor-pointer"
                                    >
                                      −
                                    </button>
                                    <span className="w-12 text-center font-semibold text-gray-800">{quantity}</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setQuantity(quantity + 1);
                                      }}
                                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-bold cursor-pointer"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>

                                <button
                                  onClick={(e) => handleAddToCart(e, card)}
                                  disabled={adding}
                                  className="w-full bg-[#7280A7] hover:bg-[#50608A] text-white font-bold py-3 rounded-full transition disabled:opacity-50 cursor-pointer"
                                >
                                  {adding ? 'Adding...' : 'Add to Cart'}
                                </button>
                              </div>

                              <p className="text-xs text-gray-500 italic mt-2">
                                Click card to see details & reviews →
                              </p>
                            </motion.div>
                          )}
                        </div>

                        {/* BACK */}
                        <div 
                          className="absolute inset-0 bg-[#7280A7] rounded-3xl shadow-2xl p-6 flex flex-col text-white overflow-y-auto"
                          style={{ 
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                          }}
                        >
                          <h3 className="text-2xl font-bold mb-4 text-center">
                            {card.name}
                          </h3>

                          <div className="mb-4">
                            <h4 className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-80">
                              About This Sticker
                            </h4>
                            <p className="text-sm leading-relaxed">
                              {card.description} - High-quality vinyl sticker, waterproof and UV resistant. 
                              Perfect for laptops, water bottles, notebooks, and more!
                            </p>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-80">
                              Specifications
                            </h4>
                            <ul className="text-sm space-y-1">
                              <li>• Size: 3" x 3"</li>
                              <li>• Material: Vinyl</li>
                              <li>• Waterproof & UV resistant</li>
                            </ul>
                          </div>

                          <div className="flex-1 overflow-y-auto">
                            <h4 className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-80">
                              Customer Reviews
                            </h4>

                            <div className="mb-4">
                              <p className="text-sm mb-2">
                                ⭐ {getAverageRating(card.id)} ({productReviews.length} reviews)
                              </p>
                            </div>

                            {/* Review Form */}
                            {user && (
                              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mb-4">
                                <h4 className="font-semibold mb-2 text-sm">Leave a Review</h4>
                                <div className="flex items-center gap-1 mb-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setNewReview({ ...newReview, rating: star });
                                      }}
                                      className="text-xl cursor-pointer"
                                    >
                                      {star <= newReview.rating ? '⭐' : '☆'}
                                    </button>
                                  ))}
                                </div>
                                <textarea
                                  value={newReview.comment}
                                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Write your review..."
                                  className="w-full p-2 border border-gray-300 text-gray-700 rounded-lg mb-2 resize-none text-sm"
                                  rows={2}
                                />
                                <button
                                  onClick={(e) => handleSubmitReview(e, card.id)}
                                  className="bg-white text-[#7280A7] hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer"
                                >
                                  Submit Review
                                </button>
                              </div>
                            )}

                            {/* Reviews List */}
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {productReviews.length === 0 ? (
                                <p className="text-white/70 text-sm">No reviews yet. Be the first!</p>
                              ) : (
                                productReviews.map((review) => (
                                  <div key={review.id} className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                                    <div className="flex justify-between items-start mb-1">
                                      <div>
                                        <p className="font-semibold text-sm">
                                          {review.users?.username || 'Anonymous'}
                                        </p>
                                        <p className="text-xs text-yellow-300">
                                          {'⭐'.repeat(review.rating)}
                                        </p>
                                      </div>
                                      <span className="text-xs opacity-70">
                                        {new Date(review.created_at).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <p className="text-sm">{review.comment}</p>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>

                          <div className="mt-4 text-center">
                            <p className="text-3xl font-bold mb-3">${card.price}</p>
                            <button 
                              onClick={(e) => handleAddToCart(e, card)}
                              disabled={adding}
                              className="w-full bg-white text-[#7280A7] py-3 rounded-full font-bold hover:bg-gray-100 transition cursor-pointer disabled:opacity-50"
                            >
                              {adding ? 'Adding...' : 'Add to Cart'}
                            </button>
                            <p className="text-xs mt-2 opacity-70">
                              Click card to flip back →
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Nav Arrows */}
                <button
                  onClick={prevCard}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 bg-white/90 hover:bg-white p-4 rounded-full shadow-lg cursor-pointer transition z-50"
                >
                  <FaChevronLeft size={32} className="text-gray-800" />
                </button>
                
                <button
                  onClick={nextCard}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 bg-white/90 hover:bg-white p-4 rounded-full shadow-lg cursor-pointer transition z-50"
                >
                  <FaChevronRight size={32} className="text-gray-800" />
                </button>
              </div>

              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <p className="text-white text-xl font-bold mb-2">
                  {currentCardIndex + 1} / {viewingStack.length}
                </p>
                <p className="text-gray-300 text-sm">
                  {isFlipped 
                    ? 'Click card to flip back • Press Space/Enter to flip'
                    : 'Click card for details • Use ← → to shuffle • Space/Enter to flip'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .filter-btn.active {
          @apply bg-[#C36880] text-white shadow-lg;
        }
      `}</style>
    </div>
  );
}