// ─────────────────────────────────────────────
// Authentication Context
//
// Provides user authentication state across the app.
// Handles user session, login state, and user data.
// ─────────────────────────────────────────────

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface AuthUser {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role?: string;
  mall_name?: string | null;
  gate_number?: string | null;
  gate_id?: string | null;
  gate_emails?: string[];
}

interface AuthContextType {
  user: AuthUser | null;
  supabaseUser: SupabaseUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (supabaseUser: SupabaseUser) => {
    try {
      // Fetch gate data from gates table based on user's email
      let gateData = null;
      if (supabaseUser.email) {
        const { data: gate } = await supabase
          .from('gates')
          .select('*')
          .contains('emails', [supabaseUser.email])
          .single();
        
        if (gate) {
          gateData = {
            gate_id: gate.id,
            gate_number: gate.gate_number,
            gate_emails: gate.emails,
            mall_name: gate.mall_name
          };
        }
      }

      // Build user data with gate information from gates table
      // Fall back to user_metadata for backward compatibility
      const userData: AuthUser = {
        id: supabaseUser.id,
        full_name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || null,
        phone: supabaseUser.phone || null,
        role: supabaseUser.user_metadata?.role || 'User',
        mall_name: gateData?.mall_name || supabaseUser.user_metadata?.mall_name || null,
        gate_number: gateData?.gate_number || supabaseUser.user_metadata?.gate_number || null,
        gate_id: gateData?.gate_id || supabaseUser.user_metadata?.gate_id || null,
        gate_emails: gateData?.gate_emails || []
      };
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Fall back to user_metadata if gates table query fails
      const userData: AuthUser = {
        id: supabaseUser.id,
        full_name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
        email: supabaseUser.email || null,
        phone: supabaseUser.phone || null,
        role: supabaseUser.user_metadata?.role || 'User',
        mall_name: supabaseUser.user_metadata?.mall_name || null,
        gate_number: supabaseUser.user_metadata?.gate_number || null,
        gate_id: supabaseUser.user_metadata?.gate_id || null,
        gate_emails: []
      };
      setUser(userData);
    }
  };

  const refreshUser = async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (currentUser) {
      setSupabaseUser(currentUser);
      await fetchUserData(currentUser);
    } else {
      setSupabaseUser(null);
      setUser(null);
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setSupabaseUser(session.user);
        await fetchUserData(session.user);
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setSupabaseUser(session.user);
          await fetchUserData(session.user);
        } else {
          setSupabaseUser(null);
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, supabaseUser, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
