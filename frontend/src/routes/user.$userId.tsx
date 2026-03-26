import { createFileRoute, Link } from "@tanstack/react-router";
import { useFetch } from "@/hooks/useFetch";
import { ENDPOINTS } from "@/const";
import { type User, type Company, UserPageParams } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/user/$userId")({
  parseParams: UserPageParams.parse,
  validateSearch: (s: Record<string, unknown>) => ({
    company: String(s.company ?? ""),
  }),
  component: UserDetailPage,
});

function UserDetailPage() {
  const { userId } = Route.useParams();
  const { company: companyId } = Route.useSearch();

  const { data: user, isLoading: userLoading } = useFetch<User>({
    url: `${ENDPOINTS.users}/${userId}`,
  });
  const { data: company, isLoading: companyLoading } = useFetch<Company>({
    url: `${ENDPOINTS.companies}/${companyId}`,
    enabled: !!companyId,
  });
  const { data: allCompanies, isLoading: allCompaniesLoading } = useFetch<Company[]>({
    url: ENDPOINTS.companies,
    enabled: !companyId,
  });

  const resolvedCompany = companyId
    ? company
    : allCompanies?.find((c) => c.users?.includes(userId));
  const companyResolutionLoading = companyId ? companyLoading : allCompaniesLoading;

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
              <span className="font-mono text-xs text-muted-foreground">
                {user.id}
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-border divide-y divide-border">
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

            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
                Company
              </span>
              {companyResolutionLoading ? (
                <span className="font-mono text-sm text-muted-foreground">
                  Loading…
                </span>
              ) : resolvedCompany ? (
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60" />
                    <span className="font-mono text-sm text-foreground">
                      {resolvedCompany.name}
                    </span>
                  </div>
                  {resolvedCompany.features && resolvedCompany.features.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-end">
                      {resolvedCompany.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span className="font-mono text-sm text-muted-foreground">
                  —
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">User not found.</p>
      )}
    </div>
  );
}
