"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User, Mail, Shield, Hash, LogOut, Building, FileText } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/signin");
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  const { full_name, email, role, apaar_id, register_no, faculty_id, admin_id } = user.user_metadata || {};

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header Background */}
        <div className="h-28 bg-gradient-to-r from-gray-100 to-gray-200"></div>
        
        <div className="px-8 pb-8 relative">
          {/* Avatar */}
          <div className="absolute -top-24 border-4 border-white w-24 h-24 rounded-full bg-black text-[#FFE55B] flex items-center justify-center text-3xl font-bold shadow-md">
            {full_name?.charAt(0) || "U"}
          </div>

          <div className="mt-4 mb-8">
            <h2 className="text-2xl font-bold">{full_name}</h2>
            <p className="text-gray-500">{email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full border border-gray-200">
              {role || "User"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Account Information</h3>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <User size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="text-sm font-medium">{full_name || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Mail size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="text-sm font-medium">{email || user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Shield size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Account Role</p>
                  <p className="text-sm font-medium">{role || "Member"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Academic Details</h3>
              
              {role === "Student" && (
                <>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Hash size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">APAAR ID</p>
                      <p className="text-sm font-medium font-mono">
                        {apaar_id ? `•••• •••• ${apaar_id.slice(-4)}` : "Not generated"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FileText size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Register Number</p>
                      <p className="text-sm font-medium">{register_no || "N/A"}</p>
                    </div>
                  </div>
                </>
              )}

              {role === "Faculty" && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Building size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Faculty ID</p>
                    <p className="text-sm font-medium">{faculty_id || "N/A"}</p>
                  </div>
                </div>
              )}

              {role === "Admin" && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Building size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Admin ID</p>
                    <p className="text-sm font-medium">{admin_id || "N/A"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
