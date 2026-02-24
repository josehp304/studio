"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export function FetchErrorToast({ message = "Failed to fetch data" }: { message?: string }) {
    const { toast } = useToast();
    const router = useRouter();
    const hasToasted = useRef(false);

    useEffect(() => {
        if (hasToasted.current) return;
        hasToasted.current = true;

        toast({
            title: "Connection Error",
            description: message,
            variant: "destructive",
            action: (
                <ToastAction altText="Retry" onClick={() => router.refresh()}>
                    Retry
                </ToastAction>
            ),
        });
    }, [message, toast, router]);

    return null;
}
