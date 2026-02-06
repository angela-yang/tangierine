"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeNav from "../../components/HomeNav"

type Flower = {
  id: string;
  imageData: string; // base64 image
  x: number; // position in garden
  y: number;
  scale: number;
  rotation: number;
}

export default function Garden() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [showDrawingCanvas, setShowDrawingCanvas] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#FF6B9D');
  const [brushSize, setBrushSize] = useState(5);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const colors = ['#FF6B9D', '#de5e5e', '#4ECDC4', '#66c688', '#a9e78dff', '#ffe397', '#f9b260ff', '#fd90a9ff', '#AA96DA', '#81b4e6', '#efe4e4'];

  useEffect(() => {
    fetch("/api/flowers")
        .then(res => res.json())
        .then(data => {
        if (Array.isArray(data)) {
            setFlowers(data);
        } else {
            console.error("Expected array, got:", data);
            setFlowers([]);
        }
        })
        .catch(err => {
        console.error("Failed to load flowers:", err);
        setFlowers([]);
        });
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLastPos({ x, y });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPos) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastPos({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPos(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveFlower = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL("image/png");

    const newFlower: Flower = {
        id: crypto.randomUUID(),
        imageData,
        x: Math.random() * 70 + 10,
        y: Math.random() * 60 + 20,
        scale: Math.random() * 0.3 + 0.8,
        rotation: Math.random() * 20 - 10,
    };

    try {
        await fetch("/api/flowers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFlower),
        });

        setFlowers(prev => [newFlower, ...prev].slice(0, 30));
    } catch (err) {
        console.error("Failed to save flower", err);
    }

    setShowDrawingCanvas(false);
    clearCanvas();
  };

  const deleteFlower = async (id: string) => {
    try {
        await fetch("/api/flowers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        });

        setFlowers(prev => prev.filter(f => f.id !== id));
    } catch (err) {
        console.error("Failed to delete flower", err);
    }
  };


  return (
    <div className="relative bg-[url('/images/bg.png')] bg-cover bg-center w-full min-h-screen overflow-x-hidden">
      <div className="hidden md:flex pointer-events-none fixed inset-0 border-[30px] border-[#3E1F69] z-10" />
      <HomeNav />

      <div className="max-w-7xl mx-auto px-6 py-20 pt-24 relative z-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-3">
            Community Garden 🌸
          </h1>
          <p className="text-xl text-white/90 drop-shadow">
            Draw a flower and watch it bloom in the garden!
          </p>
          <p className="text-sm text-white/70 mt-2">
            {flowers.length}/30 flowers planted
          </p>
        </div>

        {/* Garden Canvas */}
        <div className="relative bg-[#699170] backdrop-blur-sm rounded-3xl border-5 border-[#4E7755] shadow-2xl mb-8 overflow-hidden"
             style={{ minHeight: '500px' }}>
          
          {/* Flowers */}
          <div className="relative w-full h-full min-h-[500px] p-8">
            {flowers.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-2xl text-green-800/50 font-semibold">
                  No flowers yet... be the first to plant one!
                </p>
              </div>
            ) : (
              flowers.map((flower, index) => (
                <motion.div
                  key={flower.id}
                  initial={{ scale: 0, y: 50, opacity: 0 }}
                  animate={{ scale: flower.scale, y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                  className="absolute group cursor-pointer"
                  style={{
                    left: `${flower.x}%`,
                    top: `${flower.y}%`,
                    transform: `rotate(${flower.rotation}deg)`,
                  }}
                >
                  <img
                    src={flower.imageData}
                    alt="Flower"
                    className="w-32 h-32 object-contain drop-shadow-lg transition-transform group-hover:scale-110"
                  />
                  {/* Delete button on hover */}
                  <button
                    onClick={() => deleteFlower(flower.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold hover:bg-red-600 shadow-lg"
                  >
                    ×
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Plant Flower Button */}
        <div className="flex justify-center mb-8">
          <motion.button
            onClick={() => setShowDrawingCanvas(true)}
            className="bg-[#7280A7] hover:bg-[#E4759E] text-white text-xl font-bold px-10 py-4 rounded-full shadow-xl transition-all cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Plant a Flower
          </motion.button>
        </div>
      </div>

      {/* Drawing Canvas Modal */}
      <AnimatePresence>
        {showDrawingCanvas && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDrawingCanvas(false)}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#96A1C0]/40 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Draw Your Flower :D
              </h2>

              {/* Drawing Canvas */}
              <div className="mb-6 flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={400}
                  className="border-4 border-gray-300 rounded-xl cursor-crosshair bg-white shadow-inner"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>

              {/* Color Picker */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">Colors:</p>
                <div className="flex gap-2 flex-wrap justify-center">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setCurrentColor(color)}
                      className={`w-10 h-10 rounded-full border-4 transition-all hover:scale-110 ${
                        currentColor === color ? 'border-gray-800 scale-110' : 'border-white'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Brush Size */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Brush Size: {brushSize}px
                </p>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={clearCanvas}
                  className="bg-[#96A1C0] hover:bg-[#57617E] text-white px-6 py-3 rounded-full font-semibold transition cursor-pointer"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowDrawingCanvas(false)}
                  className="bg-[#E47577] hover:bg-[#C73D3F] text-white px-6 py-3 rounded-full font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={saveFlower}
                  className="bg-[#6DBD7B] hover:bg-[#E4759E] text-white px-8 py-3 rounded-full font-bold transition cursor-pointer"
                >
                  Plant Flower!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}