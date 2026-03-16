import { Search, Download, Shield } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Placement Cell Admin</h1>
          <p className="text-gray-500">Overview of student performance and placement eligibility.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 border border-black bg-black text-white rounded-lg font-medium hover:bg-gray-800">
             <Download size={18} /> Export CSV
           </button>
        </div>
      </header>

      {/* God Mode Search */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
         <div className="flex items-center gap-2 mb-4">
            <Shield size={20} className="text-[#FFE55B]" />
            <h2 className="text-lg font-bold">God Mode Search</h2>
         </div>
         <div className="flex gap-4">
            <div className="flex-1 relative">
               <Search className="absolute left-3 top-3 text-gray-400" size={20} />
               <input 
                 type="text" 
                 placeholder="Search by name, skill, year (e.g. '3rd Year Java Hackathon')" 
                 className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#FFE55B] outline-none transition"
               />
            </div>
            <button className="px-6 py-3 bg-gray-100 font-bold rounded-xl hover:bg-gray-200 text-gray-700">
               Apply Filters
            </button>
         </div>
         <div className="mt-4 flex gap-2 flex-wrap">
            {['> 800 Points', 'Clean Record', 'Hackathon Winner', 'Final Year'].map((tag) => (
               <span key={tag} className="px-3 py-1 bg-[#FFF8CC] text-yellow-800 rounded-full text-xs font-bold cursor-pointer hover:bg-[#FFE55B]">
                  {tag} &times;
               </span>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-xs font-bold uppercase mb-2">Total Students</p>
            <p className="text-3xl font-bold">2,140</p>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-xs font-bold uppercase mb-2">Placement Eligible</p>
            <p className="text-3xl font-bold">420</p>
            <p className="text-xs text-green-500 mt-1">↑ 12% Since last month</p>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-xs font-bold uppercase mb-2">Top Performer</p>
            <p className="text-lg font-bold truncate">Sarah Connor</p>
            <p className="text-xs text-yellow-600 font-bold">1250 Points</p>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-xs font-bold uppercase mb-2">Certificates Today</p>
            <p className="text-3xl font-bold">34</p>
         </div>
      </div>

       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
           <h3 className="text-xl font-bold mb-6">Eligible Candidates</h3>
           {/* Placeholder List */}
           <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                       <div>
                          <p className="font-bold text-sm">Student Name {i}</p>
                          <p className="text-xs text-gray-500">Computer Science • 3rd Year</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="text-sm font-bold">9{i}0 pts</span>
                       <button className="text-xs bg-black text-white px-3 py-1 rounded-md">View Profile</button>
                    </div>
                 </div>
              ))}
           </div>
       </div>
    </div>
  );
}
