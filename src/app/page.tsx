import Link from "next/link";
import { ArrowRight, GraduationCap, ShieldCheck, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navbar */}
      <nav className="border-b border-gray-100 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-black text-2xl tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FFE55B] rounded-lg"></div>
          KoCred
        </div>
        <div className="flex gap-4">
           <button className="font-bold text-sm hover:underline">About</button>
           <button className="font-bold text-sm hover:underline">Contact</button>
           <Link href="/signin">
             <button className="px-5 py-2 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-colors">Sign In</button>
           </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-[#FFE55B] px-4 py-1 rounded-full text-xs font-bold mb-6">
          v2.0 Beta Live
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
          Verify. Showcase. <br/>
          <span className="text-gray-400">Get Recognized.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 font-medium">
          The ultimate platform for student achievements, faculty verification, and placement insights. 
          Tamper-proof and instant.
        </p>
        
        <div className="flex justify-center gap-4">
           <Link href="/signup">
            <button className="px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center gap-2">
              Get Started <ArrowRight size={20} />
            </button>
           </Link>
           <button className="px-8 py-4 bg-gray-100 text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition-all">
             View Demo
           </button>
        </div>
      </div>

      {/* Role Selection */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Select Your Portal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Student Portal */}
             <Link href="/dashboard/student" className="group">
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="w-14 h-14 bg-[#FFE55B] rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                     <GraduationCap size={28} className="text-black" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Student</h3>
                  <p className="text-gray-500 mb-6">Upload certificates, generate resumes, and validte your skills with crypto-signatures.</p>
                  <div className="flex items-center text-sm font-bold group-hover:underline">
                    Enter Dashboard <ArrowRight size={16} className="ml-2" />
                  </div>
               </div>
             </Link>

             {/* Faculty Portal */}
             <Link href="/dashboard/faculty" className="group">
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                     <ShieldCheck size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Faculty</h3>
                  <p className="text-gray-500 mb-6">Bulk verify applications, manage approvals, and issue tamper-proof digital credentials.</p>
                  <div className="flex items-center text-sm font-bold group-hover:underline">
                    Enter Dashboard <ArrowRight size={16} className="ml-2" />
                  </div>
               </div>
             </Link>

             {/* Admin Portal */}
             <Link href="/dashboard/admin" className="group">
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                     <Users size={28} className="text-gray-700" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Admin</h3>
                  <p className="text-gray-500 mb-6">Placement analytics, "God Mode" search, and complete institutional oversight.</p>
                  <div className="flex items-center text-sm font-bold group-hover:underline">
                    Enter Dashboard <ArrowRight size={16} className="ml-2" />
                  </div>
               </div>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
