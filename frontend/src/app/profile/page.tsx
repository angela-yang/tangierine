"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabase";
import HomeNav from "../../components/HomeNav";

type Order = {
  id: string;
  product_name: string;
  product_image: string;
  price: number;
  user_id: string;
  created_at: string;
  users?: {
    username: string;
    email: string;
  };
};

type Commission = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  details: string;
  status: string;
  admin_response: string | null;
  responded_at: string | null;
  created_at: string;
  users?: {
    username: string;
    email: string;
  };
};

type UserProfile = {
  username: string;
  email: string;
  profile_img: string;
  is_admin: boolean;
};

export default function Profile() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Admin-specific state
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);
  const [response, setResponse] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
    const { data: userOrdersData, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false });

    if (ordersError) {
      console.error('Orders error:', ordersError);
    } else {
      setOrders(userOrdersData || []);
    }

    const { data: userCommissionsData, error: commissionsError } = await supabase
      .from('commissions')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false });

    if (commissionsError) {
      console.error('Commissions error:', commissionsError);
    } else {
      setCommissions(userCommissionsData || []);
    }

  try {
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user!.id)
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
      throw profileError;
    }
    
    setProfile(profileData);
    console.log('Profile loaded:', profileData);

    if (profileData?.is_admin) {
      console.log('User is admin, fetching admin data...');
      // Admin: fetch via API route
      const response = await fetch(`/api/admin/data?userId=${user!.id}`);
      console.log('API response status:', response.status);
      
      const data = await response.json();
      console.log('API response data:', data);
      
      setOrders(data.orders || []);
      setCommissions(data.commissions || []);
      
      console.log('Orders set:', data.orders?.length);
      console.log('Commissions set:', data.commissions?.length);
    } else {
      // Regular user code...
    }
  } catch (err) {
    console.error('Fetch error:', err);
  } finally {
    setLoading(false);
  }
};

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, {
          upsert: true,
          contentType: file.type
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('users')
        .update({ profile_img: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setProfile(prev => prev ? { ...prev, profile_img: publicUrl } : null);
    } catch (err: any) {
      console.error('Upload error:', err);
      alert('Failed to upload image: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSelectCommission = (commission: Commission) => {
    setSelectedCommission(commission);
    setResponse(commission.admin_response || "");
    setNewStatus(commission.status);
  };

  const handleSubmitResponse = async () => {
    if (!selectedCommission || !user) return;

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('commissions')
        .update({
          admin_response: response,
          status: newStatus,
          responded_at: new Date().toISOString(),
          responded_by: user.id
        })
        .eq('id', selectedCommission.id);

      if (error) throw error;

      await fetchUserData();
      setSelectedCommission(null);
      setResponse("");
      alert('Response sent successfully!');
    } catch (err: any) {
      console.error('Error:', err);
      alert('Failed to send response: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[url('/images/bg.png')] bg-cover bg-center flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[url('/images/bg.png')] bg-cover bg-center flex items-center justify-center">
        <p className="text-white text-xl">No profile found.</p>
      </div>
    );
  }

  if (profile.is_admin) {
    return (
      <div className="min-h-screen pt-20 bg-[url('/images/bg.png')] bg-cover bg-center pb-10">
        <div className="hidden md:flex pointer-events-none fixed inset-0 border-[30px] border-[#3E1F69] z-10" />
        <HomeNav />
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-pink-400 text-white px-6 py-2 font-semibold rounded-full hover:bg-pink-600 transition cursor-pointer"
            >
              Log Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* All Orders */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                All Orders ({orders.length})
              </h2>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {orders.length === 0 ? (
                  <p className="text-gray-600 text-sm">No orders yet</p>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50">
                      <Image
                        src={order.product_image}
                        alt={order.product_name}
                        width={50}
                        height={50}
                        className="rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">{order.product_name}</p>
                        <p className="text-xs text-gray-600">
                          {order.users?.username || 'Unknown'} ({order.users?.email || 'N/A'})
                        </p>
                        <p className="text-xs text-gray-500">
                          ${order.price.toFixed(2)} • {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* All Commissions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                All Commissions ({commissions.length})
              </h2>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {commissions.length === 0 ? (
                  <p className="text-gray-600 text-sm">No commissions yet</p>
                ) : (
                  commissions.map((commission) => (
                    <div
                      key={commission.id}
                      onClick={() => handleSelectCommission(commission)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedCommission?.id === commission.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm">{commission.name}</h3>
                          <p className="text-xs text-gray-600">{commission.email}</p>
                          {commission.users && (
                            <p className="text-xs text-gray-500">User: {commission.users.username}</p>
                          )}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          commission.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                          commission.status === 'approved' ? 'bg-green-200 text-green-800' :
                          commission.status === 'completed' ? 'bg-blue-200 text-blue-800' :
                          'bg-red-200 text-red-800'
                        }`}>
                          {commission.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 line-clamp-2">
                        {commission.details}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                        <span>{new Date(commission.created_at).toLocaleDateString()}</span>
                        {commission.admin_response && (
                          <span className="text-green-600 font-semibold">✓ Responded</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Commission Response Panel */}
          {selectedCommission && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Respond to Commission</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Client</label>
                    <p className="text-gray-800">{selectedCommission.name} ({selectedCommission.email})</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Details</label>
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg text-sm whitespace-pre-wrap">
                      {selectedCommission.details}
                    </p>
                  </div>
                  {selectedCommission.admin_response && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Previous Response</label>
                      <p className="text-gray-800 bg-green-50 p-3 rounded-lg text-sm">
                        {selectedCommission.admin_response}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full p-2 border text-gray-600 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Response</label>
                    <textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Type your response..."
                      className="w-full h-32 p-3 border text-gray-600 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmitResponse}
                      disabled={!response || submitting}
                      className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-xl transition disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? 'Sending...' : 'Send Response'}
                    </button>
                    <button
                      onClick={() => setSelectedCommission(null)}
                      className="px-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-xl transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // REGULAR USER VIEW
  return (
    <div className="min-h-screen pt-20 bg-[url('/images/bg.png')] bg-cover bg-center flex justify-center p-8">
      <div className="hidden md:flex pointer-events-none fixed inset-0 border-[30px] border-[#3E1F69] z-10" />
      <HomeNav />
      
      <div className="w-full max-w-md flex flex-col gap-6 relative z-20">
        <h1 className="text-4xl font-bold text-gray-200 text-center">Profile</h1>

        {/* Profile Card */}
        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              <Image
                src="images/gifs/cat1.gif"
                alt="Profile"
                width={80}
                height={80}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#8496D7] hover:bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {uploading ? '...' : '📷'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{profile.username}</h2>
            <p className="text-gray-600 text-sm">{profile.email}</p>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-2">My Orders</h3>
          {orders.length === 0 ? (
            <p className="text-gray-600 text-sm">You haven't ordered anything yet</p>
          ) : (
            <div className="flex flex-col gap-2">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center gap-3 p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition">
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

        {/* Commissions */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-2">My Commissions</h3>
          {commissions.length === 0 ? (
            <p className="text-gray-600 text-sm">No commission requests yet</p>
          ) : (
            <div className="flex flex-col gap-3">
              {commissions.map((comm) => (
                <div key={comm.id} className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      comm.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                      comm.status === 'approved' ? 'bg-green-200 text-green-800' :
                      comm.status === 'in_progress' ? 'bg-blue-200 text-blue-800' :
                      comm.status === 'completed' ? 'bg-purple-200 text-purple-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {comm.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(comm.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-800 font-medium mb-2">
                    {comm.details.substring(0, 100)}
                    {comm.details.length > 100 ? '...' : ''}
                  </p>

                  {comm.admin_response && (
                    <div className="mt-3 p-3 bg-white/80 rounded-lg border-l-4 border-indigo-500">
                      <p className="text-xs font-semibold text-indigo-700 mb-1">Admin Response:</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{comm.admin_response}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Responded: {new Date(comm.responded_at!).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  
                  {!comm.admin_response && comm.status === 'pending' && (
                    <p className="text-xs text-gray-500 italic mt-2">Waiting for admin response...</p>
                  )}
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