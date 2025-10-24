type ShopItemProps = {
  label: string;
  imgSrc: string;
  width: number;
  positionX: number;
  positionY: number;
  className?: string;
  offsetX?: number;
  offsetY?: number;
  depthX?: number;
  depthY?: number;
  onClick?: () => void;
};

export default function ShopItem({
    label,
    imgSrc,
    width,
    positionX,
    positionY,
    className,
    offsetX = 0,
    offsetY = 0,
    depthX = 1,
    depthY = 1,
    onClick,
}: ShopItemProps) {
    const parallaxX = offsetX * depthX;
    const parallaxY = offsetY * depthY;

    return (
        <div
            className={`absolute cursor-pointer transition-transform hover:scale-105 -translate-x-1/2 -translate-y-1/2 ${className}`}
            style={{
                left: `calc(${positionX}% + ${parallaxX}px)`,
                top: `calc(${positionY}% + ${parallaxY}px)`,
            }}
            onClick={onClick}
        >
        {imgSrc ? (
            <img
            src={imgSrc}
            alt={label}
            className="object-contain"
            style={{ maxWidth: `${width}%` }}
            />
        ) : (
            <div
            className="bg-green-200 flex items-center justify-center"
            style={{ width: `${width}%`, height: `${width}%` }}
            >
            {label}
            </div>
        )}
        </div>
    );
}
