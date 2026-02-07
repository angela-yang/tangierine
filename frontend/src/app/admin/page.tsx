"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabase";
import HomeNav from "../../components/HomeNav";

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

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
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
      checkAdminAndLoadCommissions();
    }
  }, [user, authLoading]);

  const checkAdminAndLoadCommissions = async () => {
    try {
      // Check if user is admin
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', user!.id)
        .single();

      if (userError) throw userError;

      if (!userData?.is_admin) {
        router.push('/');
        return;
      }

      setIsAdmin(true);

      // Load all commissions
      const { data: commissionsData, error: commissionsError } = await supabase
        .from('commissions')
        .select(`
          *,
          users (
            username,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (commissionsError) throw commissionsError;
      setCommissions(commissionsData || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
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

      // Refresh commissions
      await checkAdminAndLoadCommissions();
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[url('/images/bg.png')] bg-cover bg-center flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[url('/images/bg.png')] bg-cover bg-center pt-20 pb-10">
      <div className="hidden md:flex pointer-events-none fixed inset-0 border-[30px] border-[#3E1F69] z-10" />
      <HomeNav />

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
          Admin Dashboard - Commissions
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Commissions List */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              All Commissions ({commissions.length})
            </h2>

            {commissions.length === 0 ? (
              <p className="text-gray-600">No commissions yet</p>
            ) : (
              <div className="space-y-3">
                {commissions.map((commission) => (
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
                        <h3 className="font-bold text-gray-800">{commission.name}</h3>
                        <p className="text-sm text-gray-600">{commission.email}</p>
                        {commission.users && (
                          <p className="text-xs text-gray-500">User: {commission.users.username}</p>
                        )}
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        commission.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                        commission.status === 'approved' ? 'bg-green-200 text-green-800' :
                        commission.status === 'completed' ? 'bg-blue-200 text-blue-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {commission.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                      {commission.details}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{new Date(commission.created_at).toLocaleDateString()}</span>
                      {commission.admin_response && (
                        <span className="text-green-600 font-semibold">✓ Responded</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Commission Details & Response */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
            {selectedCommission ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Commission Details
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Client Name</label>
                    <p className="text-gray-800">{selectedCommission.name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Email</label>
                    <p className="text-gray-800">{selectedCommission.email}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Details</label>
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                      {selectedCommission.details}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Submitted</label>
                    <p className="text-gray-800">
                      {new Date(selectedCommission.created_at).toLocaleString()}
                    </p>
                  </div>

                  {selectedCommission.admin_response && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Previous Response</label>
                      <p className="text-gray-800 bg-green-50 p-3 rounded-lg whitespace-pre-wrap">
                        {selectedCommission.admin_response}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Responded: {new Date(selectedCommission.responded_at!).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Send Response</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Response
                      </label>
                      <textarea
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Type your response to the client..."
                        className="w-full h-40 p-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      onClick={handleSubmitResponse}
                      disabled={!response || submitting}
                      className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Sending...' : 'Send Response'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-lg">Select a commission to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}