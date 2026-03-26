import { KITTENS_URL } from "@/const";
import { useState } from "react";

export function KittensFeature() {
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 900) + 100);
  const [loaded, setLoaded] = useState(false);

  const w = 200 + (seed % 40);
  const h = 250 + (seed % 60);
  const url = `${KITTENS_URL}${w}/${h}`;

  const refresh = () => {
    setLoaded(false);
    setSeed(Math.floor(Math.random() * 900) + 100);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-48 h-56 rounded-lg overflow-hidden bg-muted/30 border border-border">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}
        <img
          key={seed}
          src={url}
          alt="kitten"
          className={`w-full h-full object-cover transition-all duration-500 ease-out ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <button
        onClick={refresh}
        className="text-xs font-mono px-3 py-1.5 rounded border border-border hover:bg-muted/40 transition-colors text-muted-foreground hover:text-foreground"
      >
        new kitten
      </button>
    </div>
  );
}
