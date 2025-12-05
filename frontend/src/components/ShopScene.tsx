"use client";
import { useState, useEffect } from "react";
import ShopItem from "./ShopItem";
import Link from "next/link";
import Dialogue from "./Dialogue";

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
        <main>
            <div className="absolute w-full h-full overflow-hidden">
                <div
                    className={`absolute transition-transform -translate-x-1/2 -translate-y-1/2`}
                    style={{
                        left: `calc(${29}% + ${offset.x * 0.9}px)`,
                        top: `calc(${80}% + ${offset.y * 1.2}px)`,
                    }}
                    ><img
                        src={"/images/floor.png"}
                        alt={"Floor"}
                        className="object-contain"
                        style={{ maxWidth: `160%` }}
                    />
                </div>

                <div className="absolute top-0 left-0 z-0">
                    <img
                        src="/images/border.png"
                        alt="Border"
                        className="w-screen h-screen"
                    />
                </div>

                <Link href="/shop" className="group">
                    <ShopItem 
                        label="Shelf" 
                        imgSrc="/images/shelf.png" 
                        width={50} 
                        positionX={28} 
                        positionY={65} 
                        offsetX={offset.x} 
                        offsetY={offset.y} 
                        depthX={1} 
                        depthY={1}
                        className="transition-opacity duration-300 group-hover:opacity-60"
                    />
                    <span
                        className="absolute z-10 flex items-center justify-center text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ left: `16%`, top: `60%` }}
                    >
                        Browse Products
                    </span>    
                </Link>

                <Link href="/commission" className="group">
                    <ShopItem
                        label="Frog"
                        imgSrc="/images/frog.png"
                        width={45}
                        positionX={57}
                        positionY={45}
                        offsetX={offset.x}
                        offsetY={offset.y}
                        depthX={0.4}
                        depthY={0.4}
                        className="transition-opacity duration-300 group-hover:opacity-60"
                    />
                    <span
                        className="absolute z-10 flex items-center justify-center text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ left: `43%`, top: `35%` }}
                    >
                        Place a <br /> Commission
                    </span>
                </Link>

                <Dialogue
                    text="Hello!! Welcome to my art shop :) Feel free to look around..."
                    speed={40}
                    duration={8000}
                    className="w-100"
                    style={{left: "40%", top: "15%",}}
                />

                <ShopItem label="Stars" imgSrc="/images/stars.png" width={35} positionX={22} positionY={22} offsetX={offset.x} offsetY={offset.y} depthX={0.3} depthY={0.6}/>
                <ShopItem label="Counter" imgSrc="/images/counter.png" width={90} positionX={51} positionY={60} offsetX={offset.x} offsetY={offset.y} depthX={0.5} depthY={0.6}/>

                <div
                    className="absolute left-1/2 top-0 -translate-x-1/2"
                    style={{
                        width: "auto",
                        height: "78vh",
                        transform: `translateX(38%) translate(${offset.x * 0.8}px, ${offset.y * 0.5}px)`,
                    }}
                    >
                    <img
                        src="/images/tree.png"
                        alt="Tree"
                        className="w-auto h-full object-cover"
                    />
                </div>

                <ShopItem label="Welcome" imgSrc="/images/welcome.png" width={50} positionX={76} positionY={72} offsetX={offset.x} offsetY={offset.y} depthX={0.8} depthY={0.7}/>

                <Link href="/work" className="group">
                    <ShopItem
                        label="Drawings"
                        imgSrc="/images/drawings.png"
                        width={100}
                        positionX={85}
                        positionY={45}
                        offsetX={offset.x}
                        offsetY={offset.y}
                        className="transition-opacity duration-300 group-hover:opacity-60"
                        depthX={0.5}
                        depthY={0.2}
                    />
                    <span
                        className="absolute z-10 flex items-center justify-center text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ left: `79%`, top: `45%` }}
                    >
                        Browse Past Works
                    </span>
                </Link>

                <ShopItem label="Notes" imgSrc="/images/notes.png" width={30} positionX={73} positionY={35} offsetX={offset.x} offsetY={offset.y} depthX={0.7} depthY={0.5}/>
                
                <Link href="/cart" className="group">
                    <ShopItem 
                        label="Buy" 
                        imgSrc="/images/pay.png" 
                        width={45} 
                        positionX={65} 
                        positionY={42} 
                        offsetX={offset.x} 
                        offsetY={offset.y} 
                        depthX={0.9} 
                        depthY={0.7}
                        className="transition-opacity duration-300 group-hover:opacity-60"
                    />
                    <span
                        className="absolute z-10 flex items-center justify-center text-l font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ left: `58%`, top: `41%` }}
                    >
                        Pay Now
                    </span>
                </Link>

                <Link href="/cart" className="group">
                    <ShopItem
                        label="Cart"
                        imgSrc="/images/cart.png"
                        width={75}
                        positionX={55}
                        positionY={94}
                        offsetX={offset.x}
                        offsetY={offset.y}
                        depthX={1.2}
                        depthY={1.3}
                        className="transition-opacity duration-300 group-hover:opacity-60"
                    />
                    <span
                        className="absolute z-10 flex items-center justify-center text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ left: `45%`, top: `90%` }}
                    >
                        View Cart
                    </span>
                </Link>

                <ShopItem label="Soot Sprites" imgSrc="/images/soot.png" width={60} positionX={84} positionY={81} offsetX={offset.x} offsetY={offset.y} depthX={0.9} depthY={0.7}/> 
                <ShopItem label="Plants" imgSrc="/images/plants.png" width={45} positionX={40} positionY={42} offsetX={offset.x} offsetY={offset.y} depthX={0.9} depthY={0.7}/>

                <Link href="/capsule" className="group">
                    <ShopItem 
                        label="Gumball" 
                        imgSrc="/images/gumball.png" 
                        width={40} 
                        positionX={22} 
                        positionY={82} 
                        offsetX={offset.x} 
                        offsetY={offset.y} 
                        depthX={1.2} 
                        depthY={1.3}
                        className="transition-opacity duration-300 group-hover:opacity-60"
                    />
                    <span
                        className="absolute z-10 flex items-center justify-center text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ left: `13%`, top: `75%` }}
                    >
                        Get a <br /> Capsule <br /> Toy!
                    </span>
                </Link>

                <ShopItem label="Lights" imgSrc="/images/light1.png" width={50} positionX={30} positionY={8} offsetX={offset.x} offsetY={offset.y} depthX={1.2} depthY={1.5}/>
                <ShopItem label="Light" imgSrc="/images/light2.png" width={50} positionX={85} positionY={5} offsetX={offset.x} offsetY={offset.y} depthX={1.2} depthY={1.5}/>
            </div>
        </main>
    );
}