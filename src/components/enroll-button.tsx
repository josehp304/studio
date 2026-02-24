'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EnrollButtonProps {
    courseId: string;
    price: number;
    isEnrolled: boolean;
}

export function EnrollButton({ courseId, price, isEnrolled }: EnrollButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleEnroll = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/enrollments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId })
            });

            if (!response.ok) {
                if (response.status === 401) {
                    router.push(`/auth/sign-in?callbackUrl=/courses/${courseId}`);
                    return;
                }
                throw new Error('Enrollment failed');
            }

            router.refresh(); // Refresh server components to update UI state
            router.push(`/courses/${courseId}/watch`);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isEnrolled) {
        return (
            <Button
                onClick={() => router.push(`/courses/${courseId}/watch`)}
                size="lg"
                className="w-full font-bold text-white bg-green-600 hover:bg-green-700"
            >
                Continue Learning
            </Button>
        );
    }

    return (
        <Button
            onClick={handleEnroll}
            disabled={isLoading}
            size="lg"
            className="w-full font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281]"
        >
            {isLoading ? "Enrolling..." : price === 0 ? "Enroll for Free" : `Enroll for $${price}`}
        </Button>
    );
}
