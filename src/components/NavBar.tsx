import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed top-2 left-0 w-full z-50 backdrop-blur-sm">
      <div className="bg-[rgba(245,240,230,0.95)] shadow-md rounded-full px-6 py-2 flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-900 transition-colors">
          Tangierine
        </Link>

        {/* Menu */}
        <div className="flex flex-wrap gap-4 md:gap-6 text-lg">
          {[
            { href: "/", label: "Home" },
            { href: "/shop", label: "Shop" },
            { href: "/commission", label: "Commission" },
            { href: "/signup", label: "Create Account" },
            { href: "/login", label: "Login" },
            { href: "/profile", label: "Profile" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-full bg-white/80 text-gray-700 font-medium shadow-sm hover:shadow-md hover:bg-white transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-105"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
