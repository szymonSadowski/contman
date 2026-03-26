import { useState, useEffect } from "react";

export function RandomNumberFeature() {
  const [number, setNumber] = useState(() => Math.floor(Math.random() * 10000));
  const [next, setNext] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          const newNum = Math.floor(Math.random() * 10000);
          setNext(newNum);
          setPhase("exit");
          setTimeout(() => {
            setNumber(newNum);
            setNext(null);
            setPhase("enter");
            setTimeout(() => setPhase("idle"), 350);
          }, 300);
          return 10;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="overflow-hidden h-16 flex items-center justify-center w-full">
        <span
          className={`font-mono text-5xl font-bold tracking-widest text-foreground transition-all duration-300 ease-in-out ${
            phase === "exit"
              ? "opacity-0 translate-y-6"
              : phase === "enter"
              ? "opacity-0 -translate-y-6"
              : "opacity-100 translate-y-0"
          }`}
        >
          {(next !== null ? next : number).toString().padStart(4, "0")}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-28 h-1 rounded-full bg-muted/40 overflow-hidden">
          <div
            className="h-full bg-primary/60 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / 10) * 100}%` }}
          />
        </div>
        <span className="text-xs font-mono text-muted-foreground w-6">{timeLeft}s</span>
      </div>
    </div>
  );
}
