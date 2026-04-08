"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the element comes into view
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Stop observing once it's visible so it doesn't animate out and in repeatedly
                    if (ref.current) observer.unobserve(ref.current);
                }
            },
            {
                // Trigger the animation when 15% of the element is visible
                threshold: 0.15,
                // Start a little bit early so it feels natural
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div
            ref={ref}
            // Tailwind does the heavy lifting here:
            // Starts invisible and pushed down (opacity-0 translate-y-20)
            // Transitions smoothly to visible and centered (opacity-100 translate-y-0)
            className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
                }`}
        >
            {children}
        </div>
    );
}