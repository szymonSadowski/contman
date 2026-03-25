type StatCardProps = {
  icon: React.ElementType;
  label: string;
  value: number | string;
  loading?: boolean;
};

export function StatCard({ icon: Icon, label, value, loading }: StatCardProps) {
  if (loading) {
    return <div className="w-32 h-16 rounded-lg bg-muted animate-pulse" />;
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border">
      <div className="p-1.5 rounded-md bg-primary/10">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
          {label}
        </p>
        <p className="text-xl font-semibold text-foreground leading-tight tabular-nums">
          {value}
        </p>
      </div>
    </div>
  );
}
