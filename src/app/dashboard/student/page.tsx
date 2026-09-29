"use client";

import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  Link as LinkIcon, 
  QrCode, 
  Shield, 
  Layers, 
  Download,
} from "lucide-react";
import { useState } from "react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("certificates");

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Student Dashboard</h1>
          <p className="text-gray-500 font-medium">Manage your certificates, verify achievements, and track your progress.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm">
           <button 
            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'certificates' ? 'bg-[#4F46E5] text-white shadow-sm' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
            onClick={() => setActiveTab('certificates')}
           >
             Dashboard
           </button>
           <button 
            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'resume' ? 'bg-[#4F46E5] text-white shadow-sm' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
            onClick={() => setActiveTab('resume')}
           >
             Resume Generator
           </button>
        </div>
      </header>

      {/* Stats & Identity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Credit Meter */}
        <div className="lg:col-span-2 bg-[#1A1A1A] rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5] opacity-5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="flex justify-between items-start mb-8 relative z-10">
             <div>
               <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                 Activity Credit Meter
                 <span className="bg-white/20 text-xs px-2 py-1 rounded-full border border-white/10">Level 4</span>
               </h2>
               <p className="text-gray-400">Keep participating to reach your graduation goal.</p>
             </div>
             <div className="text-right">
               <span className="text-6xl font-black text-[#4F46E5]">850</span>
               <span className="text-gray-400 font-medium ml-2">/ 1000 pts</span>
             </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between text-sm font-medium mb-2 text-gray-400">
              <span>Progress</span>
              <span>85% Completed</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-4 backdrop-blur-sm overflow-hidden">
               <div className="bg-[#4F46E5] h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        {/* Digital ID Card (Optional Feature) */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center group hover:border-[#4F46E5] transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               Active
             </div>
          </div>
          <div className="w-24 h-24 bg-gray-50 rounded-2xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
             <QrCode size={48} className="text-black" />
          </div>
          <h3 className="font-bold text-xl mb-1">Digital ID Card</h3>
          <p className="text-gray-400 text-sm mb-4">View your verifiable student identity</p>
          <button className="w-full py-3 rounded-xl border-2 border-black font-bold hover:bg-black hover:text-white transition-colors">
            Generate QR
          </button>
        </div>
      </div>

      {/* Main Action Area */}
      <h2 className="text-2xl font-bold pt-4">Upload & Verify</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Physical Certificate Upload */}
        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
           <div className="h-12 w-12 bg-[#4F46E5] rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <Upload size={24} className="text-white" />
           </div>
           <h3 className="text-xl font-bold mb-2">Smart Upload</h3>
           <p className="text-gray-500 text-sm mb-4 line-clamp-2">Upload photo of physical certificates. AI verifies details automatically.</p>
           <div className="flex gap-2">
             <span className="text-xs bg-gray-100 px-2 py-1 rounded font-medium">JPG/PNG</span>
             <span className="text-xs bg-gray-100 px-2 py-1 rounded font-medium">Offln Supp.</span>
           </div>
        </div>

        {/* E-Certificate Upload */}
        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
           <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <LinkIcon size={24} className="text-blue-600" />
           </div>
           <h3 className="text-xl font-bold mb-2">E-Certificate</h3>
           <p className="text-gray-500 text-sm mb-4 line-clamp-2">Paste a URL to automatically crawl and verify your external certifications.</p>
           <div className="flex gap-2">
             <span className="text-xs bg-gray-100 px-2 py-1 rounded font-medium">URL</span>
             <span className="text-xs bg-gray-100 px-2 py-1 rounded font-medium">Auto-Crawl</span>
           </div>
        </div>

        {/* Bundle Creator */}
        <div className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
           <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              <Layers size={24} className="text-purple-600" />
           </div>
           <h3 className="text-xl font-bold mb-2">Bundles</h3>
           <p className="text-gray-500 text-sm mb-4 line-clamp-2">Group certificates into bundles for simplified submission and organization.</p>
           <div className="flex gap-2">
             <span className="text-xs bg-gray-100 px-2 py-1 rounded font-medium">Collections</span>
           </div>
        </div>
      </div>

      {/* Recent Certificates List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
           <h2 className="text-2xl font-bold">Recent Certificates</h2>
           <button className="text-sm font-bold underline">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
               <tr>
                 <th className="text-left py-4 px-8 font-bold text-gray-500 text-sm uppercase tracking-wider">Certificate Name</th>
                 <th className="text-left py-4 px-8 font-bold text-gray-500 text-sm uppercase tracking-wider">Date</th>
                 <th className="text-left py-4 px-8 font-bold text-gray-500 text-sm uppercase tracking-wider">Points</th>
                 <th className="text-left py-4 px-8 font-bold text-gray-500 text-sm uppercase tracking-wider">Status</th>
                 <th className="text-right py-4 px-8 font-bold text-gray-500 text-sm uppercase tracking-wider">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {[
                 { name: "Intro to Machine Learning", type: "Workshop", date: "Jan 12, 2026", points: 50, status: "Verified", isEc: true },
                 { name: "State Level Hackathon", type: "Competition", date: "Dec 20, 2025", points: 100, status: "Verified", isEc: false },
                 { name: "NSS Volunteer Camp", type: "Social Work", date: "Nov 15, 2025", points: 30, status: "Pending", isEc: false },
               ].map((cert, index) => (
                 <tr key={index} className="hover:bg-gray-50 transition-colors">
                   <td className="py-4 px-8">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cert.isEc ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>
                           {cert.isEc ? <LinkIcon size={18} /> : <FileText size={18} />}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{cert.name}</p>
                          <p className="text-xs text-gray-500">{cert.type}</p>
                        </div>
                      </div>
                   </td>
                   <td className="py-4 px-8 text-gray-600 font-medium text-sm">{cert.date}</td>
                   <td className="py-4 px-8">
                      <span className="bg-[#4F46E5] text-white px-3 py-1 rounded-full text-xs font-bold">+{cert.points} pts</span>
                   </td>
                   <td className="py-4 px-8">
                      {cert.status === 'Verified' ? (
                        <div className="flex items-center gap-1.5 text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full w-fit">
                           <Shield size={14} className="fill-current" />
                           <span>Verified</span>
                           {/* X-Factor: Tamper Proof Blue Tick */}
                           <CheckCircle size={14} className="text-blue-500 fill-white ml-1" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-600 font-bold text-sm bg-amber-50 px-3 py-1 rounded-full w-fit">
                           <Clock size={14} />
                           <span>Pending</span>
                        </div>
                      )}
                   </td>
                   <td className="py-4 px-8 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors" title="Download PDF">
                           <Download size={18} />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors" title="View Details">
                           <FileText size={18} />
                        </button>
                      </div>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
