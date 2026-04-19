// ─────────────────────────────────────────────
// Notification Context
//
// Manages notification state for pending results
// Handles adding, confirming, and rejecting notifications
// Syncs with Explore page for processed results
// ─────────────────────────────────────────────

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface NotificationItem {
  id: string;
  type: "match";
  person_name: string;
  person_id: string;
  age: string;
  legal_case: string;
  score: number;
  node_id: string;
  timestamp: string;
  server_timestamp?: string;
}

export interface ProcessedResult extends NotificationItem {
  status: "confirmed" | "rejected";
  processedAt: string;
}

interface NotificationContextType {
  pendingNotifications: NotificationItem[];
  processedResults: ProcessedResult[];
  addNotification: (item: NotificationItem) => void;
  confirmNotification: (id: string) => void;
  rejectNotification: (id: string) => void;
  getPendingCount: () => number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [pendingNotifications, setPendingNotifications] = useState<NotificationItem[]>([]);
  const [processedResults, setProcessedResults] = useState<ProcessedResult[]>([]);

  const addNotification = (item: NotificationItem) => {
    setPendingNotifications(prev => [...prev, item]);
  };

  const confirmNotification = (id: string) => {
    const notification = pendingNotifications.find(n => n.id === id);
    if (!notification) return;

    const processedItem: ProcessedResult = {
      ...notification,
      status: "confirmed",
      processedAt: new Date().toISOString()
    };

    setPendingNotifications(prev => prev.filter(n => n.id !== id));
    setProcessedResults(prev => [processedItem, ...prev]);
  };

  const rejectNotification = (id: string) => {
    const notification = pendingNotifications.find(n => n.id === id);
    if (!notification) return;

    const processedItem: ProcessedResult = {
      ...notification,
      status: "rejected",
      processedAt: new Date().toISOString()
    };

    setPendingNotifications(prev => prev.filter(n => n.id !== id));
    setProcessedResults(prev => [processedItem, ...prev]);
  };

  const getPendingCount = () => pendingNotifications.length;

  return (
    <NotificationContext.Provider
      value={{
        pendingNotifications,
        processedResults,
        addNotification,
        confirmNotification,
        rejectNotification,
        getPendingCount
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
}
