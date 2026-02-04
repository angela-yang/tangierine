"use client";
import Image from "next/image";
import NavBar from "../../components/NavBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
  id: number;
  name: string;
  imgSrc: string;
  price: number;
};

type User = {
  name: string;
  email: string;
  profileImg: string;
  orders: Order[];
};

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser({
          name: data.username,
          email: data.email,
          profileImg: "/images/profile-placeholder.png", // adjust if you store profile images
          orders: data.orders || [], // make sure backend returns user orders
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUser(null);
    router.push("/login");
  };

  if (loading) return <p className="pt-24 text-center">Loading...</p>;
  if (!user) return <p className="pt-24 text-center">No user logged in.</p>;

  return (
    <div className="min-h-screen pt-20 bg-[url('/images/bg.png')] bg-cover bg-center flex justify-center p-8">
      <NavBar />
      <div className="w-full max-w-md flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Profile</h1>

        <div className="flex items-center gap-4 bg-indigo-50 p-4 rounded-2xl shadow-md">
          <Image
            src={user.profileImg}
            alt="Profile Pic"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="bg-indigo-50 p-4 rounded-2xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-2">My Orders</h3>
          {user.orders.length === 0 ? (
            <p className="text-gray-600 text-sm">You haven’t ordered anything yet</p>
          ) : (
            <div className="flex flex-col gap-2">
              {user.orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition"
                >
                  <Image
                    src={order.imgSrc}
                    alt={order.name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{order.name}</p>
                    <p className="text-gray-600 text-xs">${order.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="bg-indigo-500 text-white p-2 font-semibold rounded-2xl hover:bg-indigo-600 cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
