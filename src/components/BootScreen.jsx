import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const bootLines = [
  "Initializing portfolio interface...",
  "Loading navigation system...",
  "Checking project archive...",
  "Rendering star field...",
  "User interface ready.",
];

export function BootScreen({ onComplete }) {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < bootLines.length) {
      const timer = window.setTimeout(() => {
        setLineIndex((current) => current + 1);
      }, 420);

      return () => window.clearTimeout(timer);
    }

    const doneTimer = window.setTimeout(() => {
      onComplete();
    }, 700);

    return () => window.clearTimeout(doneTimer);
  }, [lineIndex, onComplete]);

  return (
    <motion.div
      className="boot-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="boot-card"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="boot-top">
          <span>ZENA_OS</span>
          <span>BOOT</span>
        </div>

        <div className="boot-lines">
          {bootLines.slice(0, lineIndex).map((line) => (
            <p key={line}>
              <span>&gt;</span> {line}
            </p>
          ))}
        </div>

        <div className="boot-bar">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${(lineIndex / bootLines.length) * 100}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}