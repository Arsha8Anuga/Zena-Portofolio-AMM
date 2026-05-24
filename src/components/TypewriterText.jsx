import { useEffect, useMemo, useState } from "react";

export function TypewriterText({ text, speed = 22, start = true }) {
  const chars = useMemo(() => Array.from(text), [text]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (index >= chars.length) return;

    const timer = window.setTimeout(() => {
      setIndex((current) => current + 1);
    }, speed);

    return () => window.clearTimeout(timer);
  }, [index, chars.length, speed, start]);

  return (
    <span>
      {chars.slice(0, index).join("")}
      {index < chars.length && <span className="cursor">_</span>}
    </span>
  );
}