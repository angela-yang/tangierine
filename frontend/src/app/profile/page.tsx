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

type CommissionMessage = {
  id: string;
  commission_id: string;
  sender_id: string;
  message: string;
  image_url?: string; // Add this
  created_at: string;
  users?: {
    username: string;
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
  user_unread: boolean;
  admin_unread: boolean;
  users?: {
    username: string;
    email: string;
  };
  messages?: CommissionMessage[];
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
  const [newMessage, setNewMessage] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);
  const [uploadingImage, setUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

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
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user!.id)
        .single();

      if (profileError) throw profileError;
      
      setProfile(profileData);

      if (profileData?.is_admin) {
        // Admin: fetch via API route
        const response = await fetch(`/api/admin/data?userId=${user!.id}`);
        const { orders: allOrders, commissions: allCommissions } = await response.json();
        setOrders(allOrders || []);
        setCommissions(allCommissions || []);
        
        // Count unread for admin
        const unread = allCommissions?.filter((c: Commission) => c.admin_unread).length || 0;
        setUnreadCount(unread);
      } else {
        // Regular user
        const { data: userOrdersData } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user!.id)
          .order('created_at', { ascending: false });

        const { data: userCommissionsData } = await supabase
          .from('commissions')
          .select('*')
          .eq('user_id', user!.id)
          .order('created_at', { ascending: false });

        setOrders(userOrdersData || []);
        setCommissions(userCommissionsData || []);
        
        // Count unread for user
        const unread = userCommissionsData?.filter((c: Commission) => c.user_unread).length || 0;
        setUnreadCount(unread);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedCommission || !user) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be smaller than 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${selectedCommission.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('commission-images')
        .upload(fileName, file, {
          contentType: file.type
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('commission-images')
        .getPublicUrl(fileName);

      // Send message with image
      const { error: messageError } = await supabase
        .from('commission_messages')
        .insert({
          commission_id: selectedCommission.id,
          sender_id: user.id,
          message: '[Image]',
          image_url: publicUrl
        });

      if (messageError) throw messageError;

      // Update commission unread flags
      const updates: any = {};
      if (profile?.is_admin) {
        updates.user_unread = true;
        updates.responded_at = new Date().toISOString();
        updates.responded_by = user.id;
      } else {
        updates.admin_unread = true;
      }

      await supabase
        .from('commissions')
        .update(updates)
        .eq('id', selectedCommission.id);

      // Refresh messages
      await handleSelectCommission(selectedCommission);

      // Reset file input
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      alert('Failed to upload image: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSelectCommission = async (commission: Commission) => {
    setSelectedCommission(commission);
    setNewStatus(commission.status);
    setNewMessage("");
    
    // Fetch messages for this commission
    const { data: messages } = await supabase
      .from('commission_messages')
      .select(`
        *,
        users (username)
      `)
      .eq('commission_id', commission.id)
      .order('created_at', { ascending: true });
    
    setSelectedCommission(prev => prev ? { ...prev, messages: messages || [] } : null);
    
    // Mark as read
    if (profile?.is_admin) {
      await supabase
        .from('commissions')
        .update({ admin_unread: false })
        .eq('id', commission.id);
    } else {
      await supabase
        .from('commissions')
        .update({ user_unread: false })
        .eq('id', commission.id);
    }
    
    fetchUserData(); // Refresh to update unread count
  };

  const handleSendMessage = async () => {
    if (!selectedCommission || !user || !newMessage.trim()) return;

    setSubmitting(true);

    try {
      // Add message
      const { error: messageError } = await supabase
        .from('commission_messages')
        .insert({
          commission_id: selectedCommission.id,
          sender_id: user.id,
          message: newMessage.trim()
        });

      if (messageError) throw messageError;

      // Update commission status and unread flags
      const updates: any = {
        status: newStatus,
      };

      if (profile?.is_admin) {
        updates.user_unread = true; // Mark unread for user
        updates.responded_at = new Date().toISOString();
        updates.responded_by = user.id;
      } else {
        updates.admin_unread = true; // Mark unread for admin
      }

      const { error: updateError } = await supabase
        .from('commissions')
        .update(updates)
        .eq('id', selectedCommission.id);

      if (updateError) throw updateError;

      // Send email notification
      if (profile?.is_admin) {
        // Admin sent message, notify user
        await fetch('/api/send-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: selectedCommission.email,
            subject: 'New message from Tangierine',
            message: `You have a new message regarding your commission. Check your inbox at tangierine.com/profile`
          })
        });
      }

      // Refresh messages
      await handleSelectCommission(selectedCommission);
      setNewMessage("");
      alert('Message sent!');
    } catch (err: any) {
      console.error('Error:', err);
      alert('Failed to send message: ' + err.message);
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
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative ${
                        selectedCommission?.id === commission.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300 bg-white'
                      }`}
                    >
                      {commission.admin_unread && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      )}
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
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Commission Chat Panel */}
          {selectedCommission && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Commission Chat</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Client</label>
                    <p className="text-gray-800">{selectedCommission.name} ({selectedCommission.email})</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Original Request</label>
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg text-sm whitespace-pre-wrap">
                      {selectedCommission.details}
                    </p>
                  </div>

                  {/* Message History */}
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-2 block">Conversation</label>
                    <div className="bg-gray-50 p-3 rounded-lg max-h-64 overflow-y-auto space-y-2">
                      {selectedCommission.messages && selectedCommission.messages.length > 0 ? (
                        selectedCommission.messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`p-2 rounded-lg text-sm ${
                              msg.sender_id === user!.id
                                ? 'bg-indigo-100 ml-8'
                                : 'bg-white mr-8'
                            }`}
                          >
                            <p className="font-semibold text-xs text-gray-600 mb-1">
                              {msg.sender_id === user!.id ? (profile?.is_admin ? 'You (Admin)' : 'You') : (profile?.is_admin ? msg.users?.username : 'Admin')} • {new Date(msg.created_at).toLocaleString()}
                            </p>
                            
                            {msg.image_url ? (
                              <div className="mt-2">
                                <a 
                                  href={msg.image_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="block"
                                >
                                  <img
                                    src={msg.image_url}
                                    alt="Uploaded image"
                                    className="max-w-full rounded-lg cursor-pointer hover:opacity-90 transition"
                                    style={{ maxHeight: '300px' }}
                                  />
                                </a>
                                {msg.message !== '[Image]' && (
                                  <p className="text-gray-800 mt-2">{msg.message}</p>
                                )}
                              </div>
                            ) : (
                              <p className="text-gray-800">{msg.message}</p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No messages yet</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full p-2 border border-gray-300 text-gray-700 rounded-xl focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full h-32 p-3 border border-gray-300 text-gray-700 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1 mb-2">
                      <label className="block text-sm font-semibold text-gray-700">Attach Image</label>
                      <button
                        onClick={() => imageInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-xl flex items-center justify-center disabled:opacity-50 cursor-pointer"
                        title="Upload image"
                      >
                        {uploadingImage ? '⏳' : '📎'}
                      </button>
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || submitting}
                      className="flex-1 bg-[#50608A] hover:bg-pink-500 text-white font-bold py-2 rounded-xl transition disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                    <button
                      onClick={() => setSelectedCommission(null)}
                      className="px-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-xl transition cursor-pointer"
                    >
                      Close
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
              onChange={handleProfileUpload}
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

        {/* Commissions with Chat */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-2">My Commissions</h3>
          {commissions.length === 0 ? (
            <p className="text-gray-600 text-sm">No commission requests yet</p>
          ) : (
            <div className="flex flex-col gap-3">
              {commissions.map((comm) => (
                <div key={comm.id} className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        comm.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                        comm.status === 'approved' ? 'bg-green-200 text-green-800' :
                        comm.status === 'in_progress' ? 'bg-blue-200 text-blue-800' :
                        comm.status === 'completed' ? 'bg-purple-200 text-purple-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {comm.status.replace('_', ' ').toUpperCase()}
                      </span>
                      {comm.user_unread && (
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(comm.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-800 font-medium mb-2">
                    {comm.details.substring(0, 100)}
                    {comm.details.length > 100 ? '...' : ''}
                  </p>

                  <button
                    onClick={() => handleSelectCommission(comm)}
                    className="text-xs text-[#50608A] hover:text-pink-500 font-semibold cursor-pointer"
                  >
                    View Conversation →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Chat Modal */}
        {selectedCommission && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Commission Chat</h3>
              
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600">Your Request</label>
                <p className="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">
                  {selectedCommission.details}
                </p>
              </div>

              {/* Messages */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Conversation</label>
                <div className="bg-gray-50 p-3 rounded-lg max-h-64 overflow-y-auto space-y-2">
                  {selectedCommission.messages && selectedCommission.messages.length > 0 ? (
                    selectedCommission.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-2 rounded-lg text-sm ${
                          msg.sender_id === user!.id
                            ? 'bg-indigo-100 ml-8'
                            : 'bg-white mr-8'
                        }`}
                      >
                        <p className="font-semibold text-xs text-gray-600 mb-1">
                          {msg.sender_id === user!.id ? (profile?.is_admin ? 'You (Admin)' : 'You') : (profile?.is_admin ? msg.users?.username : 'Admin')} • {new Date(msg.created_at).toLocaleString()}
                        </p>
                        
                        {msg.image_url ? (
                          <div className="mt-2">
                            <a 
                              href={msg.image_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <img
                                src={msg.image_url}
                                alt="Uploaded image"
                                className="max-w-full rounded-lg cursor-pointer hover:opacity-90 transition"
                                style={{ maxHeight: '300px' }}
                              />
                            </a>
                            {msg.message !== '[Image]' && (
                              <p className="text-gray-800 mt-2">{msg.message}</p>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-800">{msg.message}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No messages yet</p>
                  )}
                </div>
              </div>

              {/* Reply */}
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Reply</label>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full h-32 p-3 border border-gray-300 text-gray-700 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Attach Image</label>
                  <button
                    onClick={() => imageInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-xl flex items-center justify-center disabled:opacity-50 cursor-pointer"
                    title="Upload image"
                  >
                    {uploadingImage ? '⏳' : '📎'}
                  </button>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || submitting}
                  className="flex-1 bg-[#50608A] hover:bg-pink-600 text-white font-bold py-2 rounded-xl transition disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Sending...' : 'Send Reply'}
                </button>
                <button
                  onClick={() => setSelectedCommission(null)}
                  className="px-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-xl transitio cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="bg-[#50608A] text-white p-2 font-semibold rounded-2xl hover:bg-pink-500/70 cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}