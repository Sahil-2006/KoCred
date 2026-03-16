"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Home, 
  BarChart2, 
  Users, 
  CreditCard, 
  Layout, 
  Settings,
  ShieldCheck
} from "lucide-react";
import { clsx } from "clsx";

const MENU_ITEMS_FACULTY = [
  {
    category: "GENERAL",
    items: [
      { name: "Dashboard", icon: ShieldCheck, href: "/dashboard/faculty" },
      { name: "Statistics", icon: BarChart2, href: "/stats" },
    ],
  },
  {
    category: "OTHER",
    items: [
      { name: "Settings", icon: Settings, href: "/settings" },
      { name: "Home", icon: Layout, href: "/" },
    ],
  },
];

const MENU_ITEMS_ADMIN = [
  {
    category: "GENERAL",
    items: [
      { name: "Dashboard", icon: Users, href: "/dashboard/admin" },
      { name: "Statistics", icon: BarChart2, href: "/stats" },
    ],
  },
  {
    category: "OTHER",
    items: [
      { name: "Settings", icon: Settings, href: "/settings" },
      { name: "Home", icon: Layout, href: "/" },
    ],
  },
];

const MENU_ITEMS_STUDENT = [
  {
    category: "GENERAL",
    items: [
      { name: "Dashboard", icon: Home, href: "/dashboard/student" },
      { name: "Statistics", icon: BarChart2, href: "/stats" },
    ],
  },
  {
    category: "OTHER",
    items: [
      { name: "Settings", icon: Settings, href: "/settings" },
      { name: "Home", icon: Layout, href: "/" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ user_metadata?: { full_name?: string; role?: string } } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const displayName = user?.user_metadata?.full_name || "User";
  const displayRole = user?.user_metadata?.role || "Member";
  // Generate initials
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Determine menu based on user role from metadata, with URL path as fallback
  let currentMenu = MENU_ITEMS_STUDENT;
  const userRole = user?.user_metadata?.role;
  if (userRole === "Faculty" || pathname.startsWith("/dashboard/faculty")) {
    currentMenu = MENU_ITEMS_FACULTY;
  } else if (userRole === "Admin" || pathname.startsWith("/dashboard/admin")) {
    currentMenu = MENU_ITEMS_ADMIN;
  }

  return (
    <div className="w-64 bg-[#FFE55B] h-screen flex flex-col fixed left-0 top-0 overflow-y-auto text-[#202020]">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-2">
        <div className="bg-black text-[#FFE55B] p-1 rounded-full">
           {/* Simple Icon placeholder */}
           <CreditCard size={20} />
        </div>
        <span className="font-bold text-xl tracking-tight">KoCred</span>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-4 py-2 space-y-8">
        {currentMenu.map((section) => (
          <div key={section.category}>
            <h3 className="text-xs font-semibold text-gray-600 mb-3 px-3 tracking-wider">
              {section.category}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-black/5 text-black"
                        : "text-gray-700 hover:bg-black/5 hover:text-black"
                    )}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom User Profile */}
      <Link href="/settings" className="block p-4 border-t border-black/5 hover:bg-black/5 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black text-[#FFE55B] flex items-center justify-center text-xs font-bold">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{displayName}</p>
            <p className="text-xs text-gray-600 truncate">{displayRole}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
