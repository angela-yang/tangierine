type ShopItemProps = {
  label: string
  imgSrc: string
  width: number
  positionX: number
  positionY: number
}

export default function ShopItem({ label, imgSrc, width, positionX, positionY }: ShopItemProps) {
    return (
        <div
            className={`absolute cursor-pointer transition-transform hover:scale-105 -translate-x-1/2 -translate-y-1/2`}
            style={{ left: `${positionX}%`, top: `${positionY}%` }}
        >
            {imgSrc ? (
                <img src={imgSrc} alt={label} className="object-contain" style={{maxWidth: `${width}%`}} />
            ) : (
                <div className="w-32 h-32 bg-green-200 flex items-center justify-center">
                    {label}
                </div>
            )}
        </div>
    )
}
