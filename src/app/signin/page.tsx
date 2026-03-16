"use client";

import Link from "next/link";
import { ArrowRight, Mail, Lock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Signin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Fetch user profile to determine role
        // Use maybeSingle() to avoid error if profile doesn't exist yet
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .maybeSingle();
        
        if (profileError) throw profileError;

        if (!profile) {
          setError("Profile not found. Please contact support or try signing up again.");
          return;
        }

        // Redirect based on role
        if (profile?.role === 'Student') router.push('/dashboard/student');
        else if (profile?.role === 'Faculty') router.push('/dashboard/faculty');
        else if (profile?.role === 'Admin') router.push('/dashboard/admin');
        else router.push('/dashboard/student'); // Fallback
      }

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred during sign in";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-black rounded-xl mx-auto mb-4 flex items-center justify-center">
             <Lock className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-black mb-2">Welcome Back</h1>
          <p className="text-gray-500 font-medium text-sm">Sign in to access your dashboard</p>
        </div>

        <form className="space-y-4" onSubmit={handleSignin}>
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@university.edu" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                required
              />
            </div>
          </div>
          
           <div className="flex justify-end">
            <button type="button" className="text-xs font-bold text-gray-500 hover:text-black">Forgot Password?</button>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#FFE55B] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#ffe03d] transition-colors mt-2 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"} <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 font-medium text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-black font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-gray-400 font-bold text-xs hover:text-black transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
