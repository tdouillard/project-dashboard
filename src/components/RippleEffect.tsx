import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface RippleEffectProps {
  /** Optional CSS class for the wrapper */
  className?: string;
  /** Children — can be any grid or layout */
  children: React.ReactNode;
  /** Optional: apply wave scaling effect to child tiles */
  enableTileWave?: boolean;
  /** Optional selector or condition to determine which children pulse */
  tileSelector?: string;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
  className,
  children,
  enableTileWave = true,
  tileSelector,
}) => {
  const rippleProgress = useMotionValue(0);
  const [ripple, setRipple] = React.useState<{ x: number; y: number } | null>(
    null,
  );

  // Ripple circle transforms
  const circleScale = useTransform(rippleProgress, [0, 2], [0, 10]);
  const circleOpacity = useTransform(rippleProgress, [0, 2, 1], [0.6, 1, 6]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipple({ x, y });
    rippleProgress.set(0);
    animate(rippleProgress, 1, {
      duration: 1.5,
      ease: "easeOut",
    });
  };

  // Optional: wave effect on tiles (only if enabled)
  const tilesRef = React.useRef<NodeListOf<HTMLElement> | null>(null);

  React.useEffect(() => {
    if (!enableTileWave || !ripple || !tileSelector) return;
    tilesRef.current = document.querySelectorAll(tileSelector);
  }, [enableTileWave, tileSelector, ripple]);

  // Apply Framer Motion transform for each tile dynamically
  React.useEffect(() => {
    if (!enableTileWave || !tilesRef.current) return;

    const unsubscribe = rippleProgress.on("change", (p) => {
      const maxDist = Math.hypot(window.innerWidth, window.innerHeight);
      const waveFront = p * maxDist;
      const waveWidth = 150;

      tilesRef.current?.forEach((tile) => {
        const rect = tile.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        if (!ripple) return;
        const dx = ripple.x - centerX + window.scrollX;
        const dy = ripple.y - centerY + window.scrollY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const diff = Math.abs(dist - waveFront);
        const intensity = Math.max(0, 1 - diff / waveWidth);
        const scale = 1 + intensity * 0.15;

        (tile as HTMLElement).style.transform = `scale(${scale})`;
      });
    });

    return () => unsubscribe();
  }, [rippleProgress, enableTileWave, ripple]);

  return (
    <div
      onClick={handleClick}
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ position: "relative" }}
    >
      {/* Ripple circle */}
      <motion.div
        className="absolute rounded-full bg-white/10 pointer-events-none"
        style={{
          top: ripple?.y ?? 0,
          left: ripple?.x ?? 0,
          translateX: "-50%",
          translateY: "-50%",
          width: 0,
          height: 0,
          scale: circleScale,
          opacity: circleOpacity,
        }}
      />

      {children}
    </div>
  );
};
