"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import RealTimeDataTable from "@/components/RealTimeDataTable";
import {
  Menu,
  Bell,
  ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  
  const { 
    connected, 
    data: matches, 
    loading, 
    error, 
    lastUpdate, 
    connectionType, 
    sendTestData, 
    refreshData 
  } = useRealTimeData();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleConfirmMatch = (match: any) => {
    console.log('Match confirmed:', match);
  };

  const handleRejectMatch = (match: any) => {
    console.log('Match rejected:', match);
  };

  return (
    <div className="min-h-screen" style={{ background: "#F3F3F6" }}>
      <div className="flex flex-col max-w-sm mx-auto w-full min-h-screen bg-white shadow-2xl relative">

        <header
          className="flex items-center justify-between px-4 py-3"
          style={{ background: "#1F49D8" }}
        >
          <button
            aria-label="Open menu"
            onClick={() => { setMenuOpen((v) => !v); setNotifOpen(false); }}
            className="p-1 rounded-lg transition-colors active:bg-white/10"
          >
            <Menu size={24} color="#fff" />
          </button>

          <Image
            src="/logo.png"
            alt="Security System Logo"
            width={96}
            height={96}
            className="object-contain mt-3"
            priority
          />

          <button
            aria-label="Notifications"
            onClick={() => { setNotifOpen((v) => !v); setMenuOpen(false); }}
            className="relative p-1 rounded-lg transition-colors active:bg-white/10"
          >
            <Bell size={22} color="#fff" />
          </button>
        </header>

        {menuOpen && (
          <nav
            className="flex flex-col px-4 pb-2 pt-1"
            style={{ background: "#1A3EC4" }}
            aria-label="Main menu"
          >
            {[
              { label: "Home",     href: "/dashboard" },
              { label: "History",  href: "/history" },
              { label: "Settings", href: "/settings" },
              { label: "Profile",  href: "/profile" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between text-white/90 text-sm py-2.5 border-b border-white/10 last:border-0 hover:text-white transition-colors"
              >
                {label}
                <ChevronRight size={14} className="opacity-50" />
              </Link>
            ))}
          </nav>
        )}

        <div
          className="px-4 pt-1 pb-3 text-center"
          style={{ background: "#1F49D8" }}
        >
          <h1 className="text-white text-[22px] font-extrabold tracking-wide">
            Security System
          </h1>
        </div>

        <div className="flex-1 bg-white px-3 sm:px-4 pt-3 pb-4 flex flex-col gap-3 relative">

          <div
            className="flex items-center justify-center rounded-full px-4 py-3"
            style={{ background: "#1F49D8" }}
          >
            <span className="text-white text-base font-bold tracking-wide">
              Mall Masr, Gate 3
            </span>
          </div>

          <div className="flex-1">
            <RealTimeDataTable
              data={matches}
              connected={connected}
              loading={loading}
              error={error}
              lastUpdate={lastUpdate}
              connectionType={connectionType}
              onRefresh={refreshData}
              onSendTest={sendTestData}
              onConfirmMatch={handleConfirmMatch}
              onRejectMatch={handleRejectMatch}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
