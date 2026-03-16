"use client";

import { useState } from "react";
import { TrendingUp, Award, FileText, Users, CheckCircle, Clock, BarChart2 } from "lucide-react";

const MONTHLY_DATA = [
  { month: "Sep", certificates: 45, verified: 38 },
  { month: "Oct", certificates: 62, verified: 55 },
  { month: "Nov", certificates: 78, verified: 60 },
  { month: "Dec", certificates: 54, verified: 48 },
  { month: "Jan", certificates: 91, verified: 75 },
  { month: "Feb", certificates: 83, verified: 70 },
];

const CATEGORY_DATA = [
  { name: "Workshops", count: 124, color: "bg-[#FFE55B]" },
  { name: "Hackathons", count: 86, color: "bg-black" },
  { name: "Sports", count: 67, color: "bg-blue-500" },
  { name: "Social Work", count: 53, color: "bg-green-500" },
  { name: "Seminars", count: 41, color: "bg-purple-500" },
];

const RECENT_ACTIVITY = [
  { action: "Certificate verified", user: "Alice Smith", time: "2 min ago", type: "verified" },
  { action: "New upload", user: "Bob Jones", time: "15 min ago", type: "upload" },
  { action: "Certificate verified", user: "Charlie Brown", time: "1 hr ago", type: "verified" },
  { action: "Certificate rejected", user: "Diana Prince", time: "2 hrs ago", type: "rejected" },
  { action: "New upload", user: "Eve Wilson", time: "3 hrs ago", type: "upload" },
];

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState<"6m" | "3m" | "1m">("6m");
  const maxCerts = Math.max(...MONTHLY_DATA.map(d => d.certificates));
  const totalCategory = CATEGORY_DATA.reduce((sum, c) => sum + c.count, 0);

  const getDisplayData = () => {
    switch (timeRange) {
      case "3m": return MONTHLY_DATA.slice(3);
      case "1m": return MONTHLY_DATA.slice(5);
      default: return MONTHLY_DATA;
    }
  };
  const displayData = getDisplayData();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Statistics</h1>
          <p className="text-gray-500 font-medium">Overview of certificate activity and platform metrics.</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm">
          {(["6m", "3m", "1m"] as const).map((range) => (
            <button
              key={range}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${timeRange === range ? "bg-[#FFE55B] text-black shadow-sm" : "text-gray-500 hover:text-black hover:bg-gray-50"}`}
              onClick={() => setTimeRange(range)}
            >
              {range === "6m" ? "6 Months" : range === "3m" ? "3 Months" : "1 Month"}
            </button>
          ))}
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#FFF8CC] rounded-lg"><FileText size={20} className="text-yellow-700" /></div>
            <p className="text-gray-500 text-xs font-bold uppercase">Total Certificates</p>
          </div>
          <p className="text-3xl font-black">413</p>
          <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1"><TrendingUp size={12} /> +18% from last semester</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 rounded-lg"><CheckCircle size={20} className="text-green-600" /></div>
            <p className="text-gray-500 text-xs font-bold uppercase">Verified</p>
          </div>
          <p className="text-3xl font-black">346</p>
          <p className="text-xs text-gray-500 font-medium mt-1">83.8% approval rate</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-50 rounded-lg"><Clock size={20} className="text-amber-600" /></div>
            <p className="text-gray-500 text-xs font-bold uppercase">Pending</p>
          </div>
          <p className="text-3xl font-black">67</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Avg. 2.4 day review time</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg"><Users size={20} className="text-blue-600" /></div>
            <p className="text-gray-500 text-xs font-bold uppercase">Active Students</p>
          </div>
          <p className="text-3xl font-black">1,247</p>
          <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1"><TrendingUp size={12} /> +8% this month</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart2 size={20} className="text-gray-400" />
            <h2 className="text-xl font-bold">Monthly Uploads vs Verified</h2>
          </div>
          <div className="flex items-end gap-3 h-48">
            {displayData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end justify-center" style={{ height: "160px" }}>
                  <div
                    className="w-5 bg-gray-200 rounded-t-md transition-all duration-500"
                    style={{ height: `${(d.certificates / maxCerts) * 100}%` }}
                    title={`${d.certificates} uploads`}
                  ></div>
                  <div
                    className="w-5 bg-[#FFE55B] rounded-t-md transition-all duration-500"
                    style={{ height: `${(d.verified / maxCerts) * 100}%` }}
                    title={`${d.verified} verified`}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 justify-center">
            <div className="flex items-center gap-2 text-xs text-gray-500"><div className="w-3 h-3 bg-gray-200 rounded"></div> Uploads</div>
            <div className="flex items-center gap-2 text-xs text-gray-500"><div className="w-3 h-3 bg-[#FFE55B] rounded"></div> Verified</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Award size={20} className="text-gray-400" />
            <h2 className="text-xl font-bold">By Category</h2>
          </div>
          <div className="space-y-4">
            {CATEGORY_DATA.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{cat.name}</span>
                  <span className="text-gray-500">{cat.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${cat.color}`} style={{ width: `${(cat.count / totalCategory) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {RECENT_ACTIVITY.map((activity, index) => (
            <div key={index} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${activity.type === "verified" ? "bg-green-500" : activity.type === "rejected" ? "bg-red-500" : "bg-blue-500"}`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 font-medium">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
