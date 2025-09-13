import NavBar from "../components/NavBar"
import ShopScene from "../components/ShopScene"

export default function Home() {
  return (
    <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.png')" }}>
      <ShopScene />
    </div>
  )
}
