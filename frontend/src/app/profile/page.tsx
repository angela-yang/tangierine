"use client";
import Image from "next/image";
import NavBar from "../../components/NavBar"

export default function Profile() {
    const user = {
        name: "Angela Yang",
        email: "angela@example.com",
        profileImg: "/images/profile-placeholder.png",
        orders: [
            { id: 1, name: "Drawing 1", imgSrc: "/images/products/item1.png", price: 15 },
            { id: 2, name: "Print 1", imgSrc: "/images/products/item2.png", price: 25 },
        ],
    };

    return (
        <div className="min-h-screen pt-20 bg-indigo-100 flex justify-center p-8">
            <NavBar />
            <div className="w-full max-w-md flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center">Profile</h1>

            <div className="flex items-center gap-4 bg-indigo-50 p-4 rounded-2xl shadow-md">
                <Image
                    src={user.profileImg}
                    alt="Profile Picture"
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
                        <div key={order.id}
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

                <button className="w-full py-2 bg-indigo-400 text-white font-semibold rounded-xl shadow hover:bg-indigo-300 transition text-sm">
                    Log Out
                </button>
            </div>
        </div>
    );
}
