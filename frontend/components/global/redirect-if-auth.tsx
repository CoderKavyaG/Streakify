
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { supabase } from "@/configuration/supabase";

export default function RedirectIfAuth() {
    const { user, checkingAuth } = useAuthStore();
    const { updateGithubToken } = useUserStore();
    const router = useRouter();
    const [synced, setSynced] = useState(false);

    useEffect(() => {
        const syncToken = async () => {
            if (user && !synced) {
                const { data } = await supabase.auth.getSession();
                if (data.session?.provider_token) {
                    await updateGithubToken(data.session.provider_token);
                }
                setSynced(true);
                router.push("/home");
            }
        };

        if (!checkingAuth && user) {
            syncToken();
        }
    }, [user, checkingAuth, router, synced, updateGithubToken]);

    return null;
}
