"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface AutoCarouselProps {
    /** One entry per slide. Each child fills the slide — only one is visible at a time. */
    children: React.ReactNode[];
    /** Autoplay interval in ms. Set to 0 to disable autoplay. */
    autoplayDelay?: number;
    showArrows?: boolean;
    showDots?: boolean;
    className?: string;
}

export default function AutoCarousel({
                                         children,
                                         autoplayDelay = 4500,
                                         showArrows = true,
                                         showDots = true,
                                         className = "",
                                     }: AutoCarouselProps) {
    const [emblaRef, embla] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false,
        containScroll: "trimSnaps",
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const slideCount = children.length;

    const scrollTo = useCallback((index: number) => embla?.scrollTo(index), [embla]);

    // Keep dot indicator in sync with drag / swipe / arrow navigation
    useEffect(() => {
        if (!embla) return;
        const onSelect = () => setSelectedIndex(embla.selectedScrollSnap());
        onSelect();
        embla.on("select", onSelect);
        embla.on("reInit", onSelect);
        return () => {
            embla.off("select", onSelect);
            embla.off("reInit", onSelect);
        };
    }, [embla]);

    // Autoplay — pauses on hover/touch so people can actually read a card
    useEffect(() => {
        if (!embla || !autoplayDelay || slideCount <= 1 || isHovered) return;
        const interval = setInterval(() => embla.scrollNext(), autoplayDelay);
        return () => clearInterval(interval);
    }, [embla, autoplayDelay, slideCount, isHovered]);

    return (
        <div
            className={`relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {children.map((child, i) => (
                        <div key={i} className="min-w-full">
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            {showArrows && slideCount > 1 && (
                <>
                    <button
                        type="button"
                        aria-label="Previous"
                        onClick={() => embla?.scrollPrev()}
                        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-11 h-11 rounded-full bg-white shadow items-center justify-center hover:bg-maroon hover:text-white transition z-10"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        type="button"
                        aria-label="Next"
                        onClick={() => embla?.scrollNext()}
                        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-11 h-11 rounded-full bg-white shadow items-center justify-center hover:bg-maroon hover:text-white transition z-10"
                    >
                        <FaChevronRight />
                    </button>
                </>
            )}

            {showDots && slideCount > 1 && (
                <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                    {children.map((_, i) => (
                        <button
                            type="button"
                            key={i}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => scrollTo(i)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                selectedIndex === i ? "w-8 bg-maroon" : "w-2.5 bg-maroon/25"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}