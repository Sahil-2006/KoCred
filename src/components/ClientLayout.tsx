"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { clsx } from "clsx";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPage = ["/", "/signin", "/signup"].includes(pathname);

  return (
    <>
      {!isPublicPage && <Sidebar />}
      <main className={clsx("min-h-screen", !isPublicPage && "ml-64")}>
        {children}
      </main>
    </>
  );
}
