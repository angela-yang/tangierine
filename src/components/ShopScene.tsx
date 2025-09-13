import ShopItem from "./ShopItem"

export default function ShopScene() {
    return (
        <main>
            <div className="absolute w-full h-full overflow-hidden flex flex-col items-center justify-end p-8">
                <img src={"/images/border.png"} alt={"border"} className="absolute object-contain" style={{top: `0%`, maxWidth: `90%`}}/>
                <img src={"/images/decor.png"} alt={"decor"} className="absolute object-contain" style={{top: `0%`, maxWidth: `90%`}}/>
                <ShopItem label="Person" imgSrc="/images/person.png" width={50} positionX={60} positionY={35}/>
                <ShopItem label="Item 1" imgSrc="/images/item1.png" width={40} positionX={35} positionY={75}/>
                <ShopItem label="Item 2" imgSrc="/images/item2.png" width={90} positionX={85} positionY={45}/>
                <ShopItem label="Counter" imgSrc="/images/counter.png" width={90} positionX={50} positionY={63}/>
                <ShopItem label="Cat" imgSrc="/images/item3.png" width={90} positionX={50} positionY={45}/>
                <ShopItem label="Cart" imgSrc="/images/cart.png" width={75} positionX={55} positionY={92}/>
            </div>
        </main>
    )
}
