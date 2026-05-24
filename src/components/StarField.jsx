import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function StarField() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  const farX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const farY = useTransform(smoothY, [-1, 1], [-8, 8]);
  const nearX = useTransform(smoothX, [-1, 1], [-32, 32]);
  const nearY = useTransform(smoothY, [-1, 1], [-20, 20]);

  useEffect(() => {
    const handleMove = (event) => {
      mouseX.set((event.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="star-scene" aria-hidden="true">
      <motion.div className="stars stars-far" style={{ x: farX, y: farY }} />
      <motion.div className="stars stars-near" style={{ x: nearX, y: nearY }} />

      <motion.div
        className="planet"
        style={{ x: farX, y: farY }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="orbit"
        style={{ x: nearX, y: nearY }}
        animate={{ rotate: -360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}