import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Per-screen banner header — gradient hero surface, used on every screen. */
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="hero-surface relative overflow-hidden px-5 py-6 sm:px-7 sm:py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(60%_120%_at_85%_0%,rgba(255,255,255,0.35),transparent_60%)]"
      />
      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[34px]">
            {title}
          </h1>
          {description ? (
            <p className="mt-1.5 max-w-2xl text-sm text-primary-foreground/80 sm:text-[15px]">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </header>
  );
}

export function GlassCard({
  title,
  icon,
  actions,
  children,
  className,
}: {
  title?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("bento-card p-0", className)}>
      {title ? (
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
          <CardTitle className="flex items-center gap-2 text-[15px] font-semibold text-foreground">
            {icon}
            {title}
          </CardTitle>
          {actions}
        </CardHeader>
      ) : null}
      <CardContent className={title ? "" : "pt-5 sm:pt-6"}>{children}</CardContent>
    </Card>
  );
}

const TONES: Record<string, string> = {
  primary: "from-primary to-primary-glow",
  cyan: "from-neon-cyan to-neon-teal",
  green: "from-neon-green to-neon-teal",
  amber: "from-neon-gold to-neon-orange",
  red: "from-neon-red to-neon-pink",
  violet: "from-accent-pink to-primary-glow",
  slate: "from-muted to-secondary",
};

export function StatCard({
  label,
  value,
  icon,
  change,
  tone = "primary",
  loading,
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  change?: string;
  tone?: keyof typeof TONES;
  loading?: boolean;
}) {
  const positive = change?.startsWith("+");
  return (
    <Card className="bento-card hover-lift p-0">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "rounded-xl bg-gradient-to-br p-2.5 text-primary-foreground shadow-[0_10px_24px_-14px_var(--color-primary)]",
              TONES[tone] ?? TONES['primary'],
            )}
          >
            {icon}
          </div>
          {change ? (
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                positive
                  ? "border-status-success/40 text-status-success"
                  : "border-status-error/40 text-status-error",
              )}
            >
              {change}
            </Badge>
          ) : null}
        </div>
        <div className="mt-4">
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <p className="text-2xl font-semibold tracking-tight text-foreground">{value}</p>
          )}
          <p className="mt-1 text-xs font-medium text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}


const STATUS_TONE: Record<string, string> = {
  active: "border-status-success/40 bg-status-success/15 text-status-success",
  healthy: "border-status-success/40 bg-status-success/15 text-status-success",
  online: "border-status-success/40 bg-status-success/15 text-status-success",
  enabled: "border-status-success/40 bg-status-success/15 text-status-success",
  operational: "border-status-success/40 bg-status-success/15 text-status-success",
  resolved: "border-status-success/40 bg-status-success/15 text-status-success",
  paid: "border-status-success/40 bg-status-success/15 text-status-success",
  passed: "border-status-success/40 bg-status-success/15 text-status-success",
  succeeded: "border-status-success/40 bg-status-success/15 text-status-success",
  completed: "border-status-success/40 bg-status-success/15 text-status-success",
  production: "border-status-success/40 bg-status-success/15 text-status-success",
  stable: "border-status-success/40 bg-status-success/15 text-status-success",
  warning: "border-status-warning/40 bg-status-warning/15 text-status-warning",
  degraded: "border-status-warning/40 bg-status-warning/15 text-status-warning",
  pending: "border-status-warning/40 bg-status-warning/15 text-status-warning",
  investigating: "border-status-warning/40 bg-status-warning/15 text-status-warning",
  running: "border-status-warning/40 bg-status-warning/15 text-status-warning",
  training: "border-status-warning/40 bg-status-warning/15 text-status-warning",
  review: "border-status-warning/40 bg-status-warning/15 text-status-warning",
  beta: "border-status-warning/40 bg-status-warning/15 text-status-warning",
  overdue: "border-status-error/40 bg-status-error/15 text-status-error",
  critical: "border-status-error/40 bg-status-error/15 text-status-error",
  error: "border-status-error/40 bg-status-error/15 text-status-error",
  down: "border-status-error/40 bg-status-error/15 text-status-error",
  failed: "border-status-error/40 bg-status-error/15 text-status-error",
  revoked: "border-status-error/40 bg-status-error/15 text-status-error",
  blocked: "border-status-error/40 bg-status-error/15 text-status-error",
  open: "border-status-error/40 bg-status-error/15 text-status-error",
  suspended: "border-status-error/40 bg-status-error/15 text-status-error",
  high: "border-status-error/40 bg-status-error/15 text-status-error",
  retired: "border-border/60 bg-muted/40 text-muted-foreground",
  inactive: "border-border/60 bg-muted/40 text-muted-foreground",
  disabled: "border-border/60 bg-muted/40 text-muted-foreground",
  archived: "border-border/60 bg-muted/40 text-muted-foreground",
  draft: "border-border/60 bg-muted/40 text-muted-foreground",
  deprecated: "border-status-warning/40 bg-status-warning/15 text-status-warning",
};

export function StatusBadge({ value, className }: { value?: string | null; className?: string }) {
  const key = (value ?? "unknown").toLowerCase();
  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize",
        STATUS_TONE[key] ?? "border-status-info/40 bg-status-info/15 text-status-info",
        className,
      )}
    >
      {value ?? "unknown"}
    </Badge>
  );
}

export function LoadingBlock({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-2.5" role="status" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full rounded-xl" />
      ))}
    </div>
  );
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" /> Loading…
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-12 text-center sm:py-16">
      <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface text-muted-foreground">
        <Loader2 className="h-4 w-4 opacity-0" aria-hidden />
      </div>
      <p className="text-sm font-medium text-foreground">Nothing here yet</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export function ErrorState({ error }: { error: unknown }) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
    >
      <p className="font-semibold">Something went wrong</p>
      <p className="mt-1 text-destructive/90">
        {error instanceof Error ? error.message : "Failed to load data"}
      </p>
    </div>
  );
}


/** Wraps query state into loading / error / empty / content. */
export function QueryBoundary<T>({
  query,
  empty = "No records yet",
  children,
}: {
  query: { data?: T[]; isLoading: boolean; error: unknown };
  empty?: string;
  children: (rows: T[]) => ReactNode;
}) {
  if (query.isLoading) return <LoadingBlock />;
  if (query.error) return <ErrorState error={query.error} />;
  const rows = query.data ?? [];
  if (rows.length === 0) return <EmptyState message={empty} />;
  return <>{children(rows)}</>;
}

export const inr = (n: number | null | undefined) =>
  `₹${Number(n ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

export const usd = (n: number | null | undefined) =>
  `$${Number(n ?? 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

export const num = (n: number | null | undefined) =>
  Number(n ?? 0).toLocaleString("en-IN");

export const when = (value?: string | null) =>
  value ? new Date(value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—";

export const day = (value?: string | null) =>
  value ? new Date(value).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "—";

export function downloadRows(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0] ?? {});
  const csv = [
    headers.join(","),
    ...rows.map((r) =>
      headers
        .map((h) => {
          const v = r[h];
          const s = v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
          return `"${s.replace(/"/g, '""')}"`;
        })
        .join(","),
    ),
  ].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
