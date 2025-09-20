type ShopItemProps = {
  label: string;
  imgSrc: string;
  width: number; // stays % for responsiveness
  positionX: number;
  positionY: number;
  className?: string;
  offsetX?: number; // for parallax
  offsetY?: number; // for parallax
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
}: ShopItemProps) {
  return (
    <div
      className={`absolute cursor-pointer transition-transform hover:scale-105 -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{
        left: `calc(${positionX}% + ${offsetX}px)`,
        top: `calc(${positionY}% + ${offsetY}px)`,
      }}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={label}
          className="object-contain"
          style={{ maxWidth: `${width}%` }}
        />
      ) : (
        <div className="w-32 h-32 bg-green-200 flex items-center justify-center">
          {label}
        </div>
      )}
    </div>
  );
}
