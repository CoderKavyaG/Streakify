"use client";
import { User } from "@supabase/supabase-js";

import { createContext, ReactNode, useContext, useEffect } from "react";

import { supabase } from "@/configuration/supabase";
import { useAuthStore } from "@/stores/auth";

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({ user: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const setuser = useAuthStore((s) => s.setUser);
  const setCheckingAuth = useAuthStore((s) => s.setCheckingAuth);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setuser(data.user);
      setCheckingAuth(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setuser(session?.user ?? null);

        // Sync provider token if available (e.g. fresh login)
        if (session?.provider_token) {
          import("@/stores/user").then(({ useUserStore }) => {
            useUserStore.getState().updateGithubToken(session.provider_token!);
          });
        }
      },
    );
    return () => listener?.subscription.unsubscribe();
  }, [setCheckingAuth, setuser]);

  return (
    <AuthContext.Provider
      value={{ user: useAuthStore.getState().user as unknown as User }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
