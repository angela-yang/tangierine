"use client";
import { useState, useEffect } from "react";

type DialogueProps = {
  text: string;
  speed?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Dialogue({ text, speed = 50, duration, className, style,}: DialogueProps) {
  const [displayed, setDisplayed] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    if (!duration) return;
    const timeout = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`absolute bg-white/20 rounded-xl px-4 py-2 shadow-lg text-white text-lg max-w-xs z-20 ${className}`}
      style={style}
    >
      {displayed}
      <span className="animate-pulse">{displayed.length < text.length ? "|" : ""}</span>

      <button
        onClick={() => setVisible(false)}
        className="absolute top-1 right-2 text-gray-300 hover:text-gray-100 text-sm cursor-pointer"
      >
        x
      </button>
    </div>
  );
}
