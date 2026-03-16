"use client";

import Link from "next/link";
import { ArrowRight, User, Mail, Lock, Building, FileText, Hash, BadgeCheck, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("Student");
  const [apaarId, setApaarId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerNo, setRegisterNo] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [adminId, setAdminId] = useState("");

  const getPasswordStrength = (pw: string): { label: string; color: string; width: string } => {
    if (pw.length === 0) return { label: "", color: "", width: "0%" };
    if (pw.length < 6) return { label: "Too short", color: "bg-red-500", width: "20%" };
    
    let strength = 0;
    if (pw.length >= 8) strength++;
    if (/[A-Z]/.test(pw)) strength++;
    if (/[0-9]/.test(pw)) strength++;
    if (/[^A-Za-z0-9]/.test(pw)) strength++;
    
    if (strength <= 1) return { label: "Weak", color: "bg-red-400", width: "40%" };
    if (strength === 2) return { label: "Fair", color: "bg-yellow-400", width: "60%" };
    if (strength === 3) return { label: "Good", color: "bg-green-400", width: "80%" };
    return { label: "Strong", color: "bg-green-600", width: "100%" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
            apaar_id: role === "Student" ? apaarId : null,
            register_no: role === "Student" ? registerNo : null,
            faculty_id: role === "Faculty" ? facultyId : null,
            admin_id: role === "Admin" ? adminId : null,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (authError) throw authError;

      // Check if email confirmation is required (session will be null)
      if (authData.user && !authData.session) {
        setSuccess("Account created successfully! Please check your email to verify your account before logging in.");
        setTimeout(() => router.push("/signin"), 3000);
        return;
      }

      if (!authData.user) throw new Error("No user created");

      // 2. Insert into profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: fullName,
          role: role,
          email: email,
          apaar_id: role === "Student" ? apaarId : null,
          register_no: role === "Student" ? registerNo : null,
          faculty_id: role === "Faculty" ? facultyId : null,
          admin_id: role === "Admin" ? adminId : null,
        });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        throw profileError;
      }

      // 3. Redirect to dashboard
      if (role === 'Student') router.push('/dashboard/student');
      else if (role === 'Faculty') router.push('/dashboard/faculty');
      else if (role === 'Admin') router.push('/dashboard/admin');

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An error occurred during sign up";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#FFE55B] rounded-xl mx-auto mb-4 flex items-center justify-center">
             <User className="text-black" size={24} />
          </div>
          <h1 className="text-2xl font-black mb-2">Create Account</h1>
          <p className="text-gray-500 font-medium text-sm">Join KoCred as a Student or Faculty</p>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
              <CheckCircle size={16} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE55B] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@university.edu" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE55B] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Role</label>
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE55B] focus:border-transparent transition-all appearance-none"
              >
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          {role === "Student" && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Apaar ID</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={apaarId}
                    onChange={(e) => setApaarId(e.target.value)}
                    placeholder="Enter your Apaar ID" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE55B] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Register No</label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={registerNo}
                    onChange={(e) => setRegisterNo(e.target.value)}
                    placeholder="University Register No" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE55B] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {role === "Faculty" && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Faculty Advisor ID</label>
              <div className="relative">
                <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                  placeholder="Advisor ID" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE55B] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          )}

          {role === "Admin" && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Admin ID</label>
              <div className="relative">
                <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="Admin ID" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE55B] focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE55B] focus:border-transparent transition-all"
                required
                minLength={6}
              />
            </div>
            {password.length > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Password strength</span>
                  <span className="font-medium text-gray-600">{passwordStrength.label}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`} style={{ width: passwordStrength.width }}></div>
                </div>
              </div>
            )}
          </div>

          <button 
            disabled={loading}
            className="w-full bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors mt-4 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"} <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 font-medium text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-black font-bold hover:underline">
              Sign In
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
