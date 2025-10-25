type Product = {
  id: number
  name: string
  price: number
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="p-4 bg-indigo-100 shadow-md rounded-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <div className="w-40 h-40 bg-indigo-200 rounded-xl mb-4 flex items-center justify-center text-gray-500">
                Image
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
            <p className="text-gray-700 font-medium mb-4">${product.price}</p>
            <button className="bg-indigo-300 text-gray-800 px-4 py-2 rounded-full hover:bg-indigo-200 transition-colors">
                Buy
            </button>
        </div>
    )
}
