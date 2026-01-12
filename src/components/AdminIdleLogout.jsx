"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function AdminIdleLogout({ minutes = 20 }) {
    const router = useRouter();
    const timerRef = useRef(null);

    useEffect(() => {
        const supabase = createClient();
        const ms = minutes * 60 * 1000;

        const resetTimer = () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(async () => {
                await supabase.auth.signOut();
                router.replace("/login");
            }, ms);
        };

        resetTimer();

        const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
        events.forEach((evt) =>
            window.addEventListener(evt, resetTimer, { passive: true })
        );

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            events.forEach((evt) => window.removeEventListener(evt, resetTimer));
        };
    }, [minutes, router]);

    return null;
}
