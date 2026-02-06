"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabase";
import HomeNav from "../../components/HomeNav";

type Order = {
  id: string;
  product_name: string;
  product_image: string;
  price: number;
};

type UserProfile = {
  username: string;
  email: string;
  profile_img: string;
};

export default function Profile() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchUserData();
    }
  }, [user, authLoading, router]);

  const fetchUserData = async () => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user!.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  if (authLoading || loading) {
    return <p className="pt-24 text-center">Loading...</p>;
  }

  if (!profile) {
    return <p className="pt-24 text-center">No profile found.</p>;
  }

  return (
    <div className="min-h-screen pt-20 bg-[url('/images/bg.png')] bg-cover bg-center flex justify-center p-8">
      <HomeNav />
      <div className="w-full max-w-md flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-gray-200 text-center">Profile</h1>

        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md">
          <Image
            src={profile.profile_img || '/images/frog.png'}
            alt="Profile Pic"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{profile.username}</h2>
            <p className="text-gray-600 text-sm">{profile.email}</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-2">My Orders</h3>
          {orders.length === 0 ? (
            <p className="text-gray-600 text-sm">You haven't ordered anything yet</p>
          ) : (
            <div className="flex flex-col gap-2">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition"
                >
                  <Image
                    src={order.product_image}
                    alt={order.product_name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">{order.product_name}</p>
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