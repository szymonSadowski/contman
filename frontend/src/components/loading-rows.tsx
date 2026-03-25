export function LoadingRows() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-3 bg-muted/40 border-b border-border">
        <div className="h-4 w-64 bg-muted rounded animate-pulse" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-4 py-4 border-b border-border last:border-0"
        >
          <div className="h-3 w-16 bg-muted rounded animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          <div className="h-3 w-32 bg-muted rounded animate-pulse" />
          <div className="h-3 w-24 bg-muted rounded animate-pulse ml-auto" />
        </div>
      ))}
    </div>
  );
}
