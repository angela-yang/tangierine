"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const catGifs = [
  { gif: "images/gifs/cat.gif" },
  { gif: "images/gifs/cat1.gif" },
  { gif: "images/gifs/cat2.gif" },
  { gif: "images/gifs/cat3.gif" },
  { gif: "images/gifs/cat4.gif" },
  { gif: "images/gifs/cat5.gif" },
  { gif: "images/gifs/cat6.gif" },
  { gif: "images/gifs/cat7.gif" },
  { gif: "images/gifs/cat8.gif" },
  { gif: "images/gifs/cat9.gif" },
]

type Reward = {
  type: 'product' | 'note';
  product?: typeof products[0];
  note?: typeof catGifs[0];
  color: string;
}

export default function Capsule() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isSpinning, setIsSpinning] = useState(false);
  const [capsuleFalling, setCapsuleFalling] = useState(false);
  const [capsuleOpened, setCapsuleOpened] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [coins, setCoins] = useState(0);
  const [canClick, setCanClick] = useState(false);
  
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

  const capsuleColors = ['#DF8385', '#F5BC78', '#A19659', '#8496D7', '#F67CC1', '#B06EE0'];

  const getRandomReward = (hasCoins: boolean): Reward => {
    const color = capsuleColors[Math.floor(Math.random() * capsuleColors.length)];

    if (!hasCoins) {
      const randomNote = catGifs[Math.floor(Math.random() * catGifs.length)];
      return { type: 'note', note: randomNote, color };
    }

    const isProduct = Math.random() < 0.5;

    if (isProduct) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      return { type: 'product', product: randomProduct, color };
    } else {
      const randomNote = catGifs[Math.floor(Math.random() * catGifs.length)];
      return { type: 'note', note: randomNote, color };
    }
  };

  const handleTurnKnob = () => {
    if (isSpinning) return;
    
    const hasCoins = coins > 0;
    
    if (hasCoins) {
      setCoins(prev => prev - 1);
    }
    
    setIsSpinning(true);
    const reward = getRandomReward(hasCoins);
    setCurrentReward(reward);
    setCanClick(false);

    setTimeout(() => {
      setIsSpinning(false);
      setCapsuleFalling(true);
    }, 2000);

    setTimeout(() => {
      setCanClick(true);
    }, 5000);
  };

  const handleOpenCapsule = () => {
    if (!currentReward || capsuleOpened || !canClick) return;
    
    setCapsuleOpened(true);
    setTimeout(() => {
      setShowReward(true);
    }, 500);
  };

  const handleClose = () => {
    setShowReward(false);
    setCapsuleOpened(false);
    setCapsuleFalling(false);
    setCurrentReward(null);
    setCanClick(false);
  };

  const earnCoins = (amount: number) => {
    setCoins(prev => prev + amount);
  };

  return (
    <div className="absolute bg-[url('/images/bg.png')] bg-cover bg-center w-full min-h-screen max-h-[130vh] overflow-hidden">
      <div className="hidden md:flex pointer-events-none fixed inset-0 border-[30px] border-[#3E1F69] z-10" />
      <HomeNav />
      
      {/* Coin Display */}
      <div className="fixed top-24 right-8 z-30 bg-[#EBC794] border-4 border-[#CB9861] rounded-full px-6 py-3 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🪙</span>
          <span className="text-xl font-bold text-yellow-900">{coins}</span>
        </div>
      </div>

      {/* Debug: Button to test earning coins */}
      <button
        onClick={() => earnCoins(5)}
        className="fixed top-24 left-8 z-30 bg-[#7280A7] text-white px-4 py-2 rounded-lg shadow-lg hover:bg-[#50608A] cursor-pointer"
      >
        + Add 5 Coins (Test)
      </button>
      
      <div
        className="absolute transition-transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `calc(${29}% + ${offset.x * 0.9}px)`,
          top: `calc(${80}% + ${offset.y * 1.2}px)`,
        }}
      >
        <img
          src="/images/floor.png"
          alt="Floor"
          className="object-contain"
          style={{ maxWidth: `160%` }}
        />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-14 pt-[70px] relative z-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-100 mb-3">Capsule Toy</h1>
          <p className="text-gray-200/80 text-xl">
            {coins > 0 ? 'Spend 1 coin for a prize!' : 'No coins? You can still gamble!'}
          </p>
        </div>

        {/* Capsule Machine */}
        <div className="relative flex flex-col items-center mb-32">
          <div className="relative flex flex-col items-center">
            {/* Glass Dome */}
            <div className="relative w-80 h-80 bg-[#7280A7]/40 rounded-full border-8 border-[#7280A7] shadow-2xl overflow-hidden backdrop-blur-sm">
              <motion.div
                className="absolute inset-0 flex flex-wrap gap-4 p-8 justify-center items-center"
                animate={isSpinning ? { rotate: 360 } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                {capsuleColors.slice(0, 6).map((color, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 rounded-full shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
                      transform: `rotate(${i * 30}deg)`
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Machine Base */}
            <div className="w-80 h-40 bg-[#C36880] rounded-b-3xl border-8 border-gray-700 shadow-2xl -mt-4 relative">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-sm shadow-inner flex items-center justify-center"/>
              
              {/* Turn Knob */}
              <motion.button
                onClick={handleTurnKnob}
                disabled={isSpinning}
                className="absolute -right-8 top-1/2 -translate-y-1/2 w-20 h-20 bg-[#EBC794] rounded-full border-4 border-[#CB9861] shadow-xl hover:bg-[#CB9861] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                whileHover={!isSpinning ? { scale: 1.1 } : {}}
                whileTap={!isSpinning ? { rotate: 90 } : {}}
                animate={isSpinning ? { rotate: 360 } : {}}
                transition={isSpinning ? { duration: 2, ease: "linear", repeat: Infinity } : {}}
              >
                <span className="text-2xl font-black text-yellow-900 p-4">
                  {isSpinning ? '⟳' : 'TURN'}
                </span>
              </motion.button>

              {/* Dispensing Tray */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-16 bg-gray-800 rounded-b-lg border-4 border-gray-700 shadow-lg flex items-center justify-center">
                <AnimatePresence>
                  {capsuleFalling && currentReward && (
                    <motion.div
                      initial={{ y: -250, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className={`absolute cursor-pointer ${!canClick ? 'pointer-events-none' : ''}`}
                      onClick={handleOpenCapsule}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full shadow-2xl relative flex items-center justify-center cursor-pointer"
                        style={{
                          background: `linear-gradient(135deg, ${currentReward.color} 0%, ${currentReward.color}dd 100%)`,
                          border: '3px solid rgba(255,255,255,0.5)'
                        }}
                        animate={
                          capsuleOpened 
                            ? { scale: [1, 1.3, 0], rotate: 180 } 
                            : canClick 
                              ? { y: [0, -8, 0], scale: [1, 1.05, 1] } 
                              : {}
                        }
                        transition={
                          capsuleOpened 
                            ? { duration: 0.5 } 
                            : { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
                        }
                      >
                        {!capsuleOpened && canClick && (
                          <motion.div 
                            className="text-white font-bold text-xs bg-black/40 px-2 py-1 rounded backdrop-blur-sm"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            OPEN!
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <p className="text-gray-200 text-center mt-20 text-lg font-semibold">
            {coins > 0 
              ? 'Click the yellow knob to spend 1 coin!' 
              : 'Click the yellow knob to dispense!'}
          </p>
        </div>

        <ShopItem label="Lights" imgSrc="/images/light1.png" width={50} positionX={30} positionY={8} offsetX={offset.x} offsetY={offset.y} depthX={1.0} depthY={1.0}/>
        <ShopItem label="Light" imgSrc="/images/light2.png" width={50} positionX={85} positionY={5} offsetX={offset.x} offsetY={offset.y} depthX={1.0} depthY={1.0}/>
      </div>

      {/* Reward Modal */}
      <AnimatePresence>
        {showReward && currentReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white p-8 max-w-lg w-full rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {currentReward.type === 'product' && currentReward.product ? (
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">You Won!</h2>
                  <img
                    src={currentReward.product.image}
                    alt={currentReward.product.name}
                    className="w-48 h-48 object-contain mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {currentReward.product.name}
                  </h3>
                  <p className="text-xl text-gray-600 mb-6">
                    ${currentReward.product.price}
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-[#7280A7] text-white px-8 py-3 rounded-full hover:bg-blue-700 transition font-bold cursor-pointer"
                  >
                    Awesome!
                  </button>
                </div>
              ) : null}

              {currentReward.type === 'note' && currentReward.note ? (
                <div className="text-center">
                <h1 className="text-gray-600 mb-6">You get a cat GIF :D</h1>
                  <div className="mb-6 flex justify-center">
                    <img 
                      src={currentReward.note.gif} 
                      alt="Cat gif"
                      className="w-64 h-64 object-contain"
                    />
                  </div>
                  <p className="text-gray-500 mb-6 italic">
                    {coins === 0 ? "Come back when you have coins for prizes!" : "Better luck next time!"}
                  </p>
                  <button
                    onClick={handleClose}
                    className="bg-[#7280A7] text-white px-8 py-3 rounded-full hover:bg-pink-700 transition font-bold cursor-pointer"
                  >
                    Meow
                  </button>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}