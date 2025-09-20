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
        <main className="relative w-full h-screen object-cover overflow-hidden">
        <div className="absolute w-full h-full">
            <div
                className={`absolute transition-transform  -translate-x-1/2 -translate-y-1/2`}
                style={{
                    left: `calc(${28}% + ${offset.x}px)`,
                    top: `calc(${70}% + ${offset.y}px)`,
                }}
                ><img
                    src={"/images/floor.png"}
                    alt={"Floor"}
                    className="object-contain"
                    style={{ maxWidth: `155%` }}
                />
            </div>
            <Link href="/commission" className="group">
            <ShopItem
                label="Frog"
                imgSrc="/images/frog.png"
                width={45}
                positionX={57}
                positionY={45}
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

            <ShopItem label="Counter" imgSrc="/images/counter.png" width={90} positionX={51} positionY={60} offsetX={offset.x} offsetY={offset.y}/>
            <ShopItem label="Tree" imgSrc="/images/tree.png" width={135} positionX={62} positionY={42} offsetX={offset.x} offsetY={offset.y}/>

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
