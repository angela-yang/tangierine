import HomeNav from "../components/HomeNav"
import ShopScene from "../components/ShopScene"

export default function Home() {
  return (
    <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/bg.png')" }}>
      <HomeNav />
      <ShopScene />
    </div>
  )
}
