"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import RealTimeDataTable from "@/components/RealTimeDataTable";
import NotificationBell from "@/components/NotificationBell";
import {
  Menu,
  ChevronRight,
  MapPin,
  User,
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
    refreshData,
    emitCriminalConfirmed,
    emitCriminalRejected
  } = useRealTimeData();
  
  const [menuOpen, setMenuOpen] = useState(false);

  const handleConfirmMatch = (match: any) => {
    console.log('Match confirmed:', match);
    emitCriminalConfirmed(match);
  };

  const handleRejectMatch = (match: any) => {
    console.log('Match rejected:', match);
    emitCriminalRejected(match);
  };

  return (
    <div className="min-h-screen" style={{ background: "#F3F3F6" }}>
      <div className="flex flex-col w-full min-h-screen bg-white shadow-2xl relative sm:max-w-md sm:mx-auto">

        <header
          className="flex items-center justify-between px-4 py-3"
          style={{ background: "#1F49D8" }}
        >
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
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

          <NotificationBell />
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

          {/* Location card - Original design restored */}
          <div
            className="flex items-center gap-2 rounded-xl px-2.5 py-2"
            style={{ background: "#ECECF1" }}
          >
            <div
              className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
              style={{ background: "#C8D0E7" }}
            >
              <User size={18} color="#7A8BB0" />
            </div>
            <div>
              <p className="text-[10px] text-[#7A8BB0] font-medium">Delivered from</p>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin size={10} color="#E8334A" />
                <span className="text-[12px] font-semibold text-[#1A1A1A]">
                  Mall Masr, Gate 3
                </span>
              </div>
            </div>
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
