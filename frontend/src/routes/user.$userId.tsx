import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useFetch } from "@/hooks/useFetch";
import { ENDPOINTS } from "@/const";
import { type User, type Company, UserPageParams } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Play } from "lucide-react";
import { FeatureOutput } from "@/components/features/feature-output";

export const Route = createFileRoute("/user/$userId")({
  parseParams: UserPageParams.parse,
  component: UserDetailPage,
});

function UserDetailPage() {
  const { userId } = Route.useParams();

  const { data: user, isLoading: userLoading } = useFetch<User>({
    url: `${ENDPOINTS.users}/${userId}`,
  });
  const { data: allCompanies, isLoading: companiesLoading } = useFetch<
    Company[]
  >({
    url: ENDPOINTS.companies,
  });

  const userCompanies = allCompanies?.filter((c) => c.users?.includes(userId)) ?? [];
  const KNOWN_FEATURES = new Set(["kittens", "random-number", "company"]);
  const uniqueFeatures = [...new Set(userCompanies.flatMap((c) => c.features ?? []))].filter(
    (f) => KNOWN_FEATURES.has(f)
  );

  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  return (
    <div className="max-w-2xl">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Back to Users
      </Link>

      {userLoading ? (
        <div className="h-32 rounded-lg border border-border bg-muted/20 animate-pulse" />
      ) : user ? (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 ring-1 ring-border">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {user.name}
              </h1>
            </div>
          </div>

          <div className="rounded-lg border border-border divide-y divide-border">
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
                ID
              </span>
              <span className="font-mono text-sm text-foreground">{user.id}</span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
                Joined
              </span>
              <span className="font-mono text-sm text-foreground">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="px-4 py-3 flex items-start justify-between">
              <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
                Companies
              </span>
              {companiesLoading ? (
                <span className="font-mono text-sm text-muted-foreground">
                  Loading…
                </span>
              ) : userCompanies.length > 0 ? (
                <div className="flex flex-col gap-1 items-end">
                  {userCompanies.map((c) => (
                    <div key={c.id} className="flex items-center gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="font-mono text-sm text-foreground">{c.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="font-mono text-sm text-muted-foreground">
                  —
                </span>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-border divide-y divide-border">
            <div className="px-4 py-3">
              <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
                Features
              </span>
            </div>
            {companiesLoading ? (
              <div className="px-4 py-3">
                <span className="font-mono text-sm text-muted-foreground">
                  Loading…
                </span>
              </div>
            ) : uniqueFeatures.length > 0 ? (
              uniqueFeatures.map((f) => (
                <div
                  key={f}
                  className="px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="font-mono text-sm text-foreground">{f}</span>
                  </div>
                  <button
                    onClick={() =>
                      setActiveFeature(activeFeature === f ? null : f)
                    }
                    className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded border transition-colors ${
                      activeFeature === f
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Play className="w-2.5 h-2.5" />
                    run
                  </button>
                </div>
              ))
            ) : (
              <div className="px-4 py-3">
                <span className="font-mono text-sm text-muted-foreground">
                  —
                </span>
              </div>
            )}
          </div>

          {activeFeature && (
            <div className="rounded-lg border border-border divide-y divide-border">
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
                  Output
                </span>
                <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                  {activeFeature}
                </span>
              </div>
              <div className="px-4 py-4">
                <FeatureOutput feature={activeFeature} userId={userId} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">User not found.</p>
      )}
    </div>
  );
}
