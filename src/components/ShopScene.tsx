import ShopItem from "./ShopItem"
import Link from "next/link"

export default function ShopScene() {
    return (
        <main>
            <div className="absolute w-full h-full overflow-hidden flex flex-col items-center justify-end p-8">
                <Link href="/commission" className="group">
                    <ShopItem label="Frog" imgSrc="/images/frog.png" width={51} positionX={56} positionY={37} className="transition-opacity duration-300 group-hover:opacity-60"/>
                    <span className="absolute z-10 flex items-center justify-center text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                          style={{ left: `43%`, top: `35%` }}>
                        Place a <br></br> Commission
                    </span>
                </Link>
                <Link href="/shop" className="group">
                    <ShopItem label="Drawings" imgSrc="/images/drawings.png" width={100} positionX={85} positionY={50} className="transition-opacity duration-300 group-hover:opacity-60"/>
                    <span className="absolute z-10 flex items-center justify-center text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                          style={{ left: `79%`, top: `50%` }}>
                        Browse Drawings
                    </span>
                </Link>
                <ShopItem label="Notes" imgSrc="/images/notes.png" width={30} positionX={73} positionY={35}/>
                <ShopItem label="Buy" imgSrc="/images/pay.png" width={45} positionX={65} positionY={42}/>
                <Link href="/cart" className="group">
                    <ShopItem label="Cart" imgSrc="/images/cart.png" width={75} positionX={55} positionY={92} className="transition-opacity duration-300 group-hover:opacity-60"/>
                    <span className="absolute z-10 flex items-center justify-center text-xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                          style={{ left: `45%`, top: `90%` }}>
                        View Cart
                    </span>
                </Link>
                <ShopItem label="Plants" imgSrc="/images/plants.png" width={45} positionX={40} positionY={42}/>
                <ShopItem label="Shelf" imgSrc="/images/shelf.png" width={50} positionX={28} positionY={65}/>
                <ShopItem label="Gumball" imgSrc="/images/gumball.png" width={40} positionX={22} positionY={82}/>
                <ShopItem label="Lights" imgSrc="/images/light1.png" width={50} positionX={30} positionY={10}/>
                <ShopItem label="Light" imgSrc="/images/light2.png" width={50} positionX={85} positionY={5}/>
            </div>
        </main>
    )
}
