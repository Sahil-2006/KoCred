import { Check, X, Filter } from "lucide-react";

export default function FacultyDashboard() {
  const pendingRequests = [
    { id: 1, student: "Alice Smith", event: "Web Dev Workshop", date: "Jan 14, 2026", image: "cert1.jpg" },
    { id: 2, student: "Bob Jones", event: "Inter-college Football", date: "Jan 13, 2026", image: "cert2.jpg" },
    { id: 3, student: "Charlie Brown", event: "Ethical Hacking Seminar", date: "Jan 12, 2026", image: "cert3.jpg" },
    { id: 4, student: "Diana Prince", event: "NSS Volunteering", date: "Jan 12, 2026", image: "cert4.jpg" },
  ];

  return (
    <div className="p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Faculty Verification</h1>
          <p className="text-gray-500">Review and approve student certificates.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg font-medium hover:bg-gray-50">
             <Filter size={18} /> Filter
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800">
             <Check size={18} /> Bulk Approve (4)
           </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
             <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                <tr>
                   <th className="p-4"><input type="checkbox" className="rounded" /></th>
                   <th className="p-4">Student Name</th>
                   <th className="p-4">Event / Activity</th>
                   <th className="p-4">Date</th>
                   <th className="p-4">Proof</th>
                   <th className="p-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {pendingRequests.map((req) => (
                   <tr key={req.id} className="hover:bg-gray-50/50 transition">
                      <td className="p-4"><input type="checkbox" className="rounded" /></td>
                      <td className="p-4 font-bold">{req.student}</td>
                      <td className="p-4 text-gray-600">{req.event}</td>
                      <td className="p-4 text-gray-500">{req.date}</td>
                      <td className="p-4 text-blue-600 font-medium cursor-pointer hover:underline">View Image</td>
                      <td className="p-4 text-right">
                         <div className="flex justify-end gap-2">
                            <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 tooltip" title="Reject">
                               <X size={18} />
                            </button>
                            <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 tooltip" title="Approve">
                               <Check size={18} />
                            </button>
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center text-sm text-gray-500 cursor-pointer hover:text-black">
           Load more pending requests...
        </div>
      </div>
    </div>
  );
}
