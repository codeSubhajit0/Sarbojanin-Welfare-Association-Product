"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Animation delay in ms — use to stagger items in a grid/list. */
  delay?: number;
  /** Direction the content travels in from. */
  direction?: "up" | "down" | "left" | "right" | "none";
  as?: keyof JSX.IntrinsicElements;
};

const offsets: Record<NonNullable<RevealProps["direction"]>, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  none: "",
};


export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${offsets[direction]}`
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
