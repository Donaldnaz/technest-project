"use client";

import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

import { useClientMounted } from "@/hooks/use-client-mounted";

type ConfettiBurstProps = {
  active: boolean;
  onComplete?: () => void;
};

const COLORS = [
  "bg-primary",
  "bg-teal-100",
  "bg-lavender-200",
  "bg-terracotta-200",
  "bg-amber-200",
];

function createParticles() {
  return Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.3,
    color: COLORS[i % COLORS.length] ?? "bg-primary",
    size: 4 + Math.random() * 6,
  }));
}

export function ConfettiBurst({ active, onComplete }: ConfettiBurstProps) {
  const mounted = useClientMounted();
  const onCompleteRef = useRef(onComplete);

  const particles = useMemo(
    () => (active ? createParticles() : []),
    [active],
  );

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => {
      onCompleteRef.current?.();
    }, 2200);

    return () => clearTimeout(timer);
  }, [active]);

  if (!mounted || particles.length === 0) return null;

  return createPortal(
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full ${p.color} animate-[confetti-fall_1.8s_ease-out_forwards]`}
          style={{
            left: `${p.x}%`,
            top: "40%",
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>,
    document.body,
  );
}
