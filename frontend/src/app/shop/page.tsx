import NavBar from "../../components/NavBar"
import ProductCard from "../../components/ProductCard"

const products = [
  { id: 1, name: "Digital Commission", price: 20, image:"images/products/commission.png" },
  { id: 2, name: "Print - Small", price: 10, image:"images/products/print.png" },
  { id: 3, name: "Print - Large", price: 15, image:"images/products/print.png" },
  { id: 4, name: "Sticker Pack", price: 5, image:"images/products/sticker.png" },
  { id: 5, name: "Blind Pack", price: 15, image:"images/products/blind.png" },
]

export default function Shop() {
  return (
    <div className="bg-indigo-200 min-h-screen" style={{ marginTop: '50px' }}>
      <NavBar />
      <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
