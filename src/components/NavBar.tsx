import Link from "next/link"

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 ">
      <div className="bg-[rgb(149,154,224)] rounded px-6 py-4 text-gray-700 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Tangierine
        </Link>
        <div className="flex gap-6 text-lg">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-gray-900 transition-colors">
            Shop
          </Link>
          <Link href="/commission" className="hover:text-gray-900 transition-colors">
            Commission
          </Link>
        </div>
      </div>
    </nav>
  )
}
