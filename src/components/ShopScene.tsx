"use client";
import { useState, useEffect } from "react";
import ShopItem from "./ShopItem";
import Link from "next/link";

export default function ShopScene() {
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

    return (
        <main className="relative w-full h-screen overflow-hidden">
        <div className="absolute w-full h-full">
            <Link href="/commission" className="group">
            <ShopItem
                label="Frog"
                imgSrc="/images/frog.png"
                width={51}
                positionX={56}
                positionY={37}
                offsetX={offset.x}
                offsetY={offset.y}
                className="transition-opacity duration-300 group-hover:opacity-60"
            />
            <span
                className="absolute z-10 flex items-center justify-center text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ left: `43%`, top: `35%` }}
            >
                Place a <br /> Commission
            </span>
            </Link>

            <Link href="/shop" className="group">
            <ShopItem
                label="Drawings"
                imgSrc="/images/drawings.png"
                width={100}
                positionX={85}
                positionY={50}
                offsetX={offset.x}
                offsetY={offset.y}
                className="transition-opacity duration-300 group-hover:opacity-60"
            />
            <span
                className="absolute z-10 flex items-center justify-center text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ left: `79%`, top: `50%` }}
            >
                Browse Drawings
            </span>
            </Link>

            <ShopItem label="Notes" imgSrc="/images/notes.png" width={30} positionX={73} positionY={35} offsetX={offset.x} offsetY={offset.y}/>
            <ShopItem label="Buy" imgSrc="/images/pay.png" width={45} positionX={65} positionY={42} offsetX={offset.x} offsetY={offset.y}/>
            
            <Link href="/cart" className="group">
            <ShopItem
                label="Cart"
                imgSrc="/images/cart.png"
                width={75}
                positionX={55}
                positionY={92}
                offsetX={offset.x}
                offsetY={offset.y}
                className="transition-opacity duration-300 group-hover:opacity-60"
            />
            <span
                className="absolute z-10 flex items-center justify-center text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ left: `45%`, top: `90%` }}
            >
                View Cart
            </span>
            </Link>

            <ShopItem label="Plants" imgSrc="/images/plants.png" width={45} positionX={40} positionY={42} offsetX={offset.x} offsetY={offset.y}/>
            <ShopItem label="Shelf" imgSrc="/images/shelf.png" width={50} positionX={28} positionY={65} offsetX={offset.x} offsetY={offset.y}/>
            <ShopItem label="Gumball" imgSrc="/images/gumball.png" width={40} positionX={22} positionY={82} offsetX={offset.x} offsetY={offset.y}/>
            <ShopItem label="Lights" imgSrc="/images/light1.png" width={50} positionX={30} positionY={10} offsetX={offset.x} offsetY={offset.y}/>
            <ShopItem label="Light" imgSrc="/images/light2.png" width={50} positionX={85} positionY={5} offsetX={offset.x} offsetY={offset.y}/>
        </div>
        </main>
    );
}
