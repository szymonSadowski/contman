import { useFetch } from "@/hooks/useFetch";
import { ENDPOINTS } from "@/const";
import type { Company, User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = { userId: string };

export function CompanyFeature({ userId }: Props) {
  const { data: companies, isLoading: companiesLoading } = useFetch<Company[]>({
    url: ENDPOINTS.companies,
  });
  const { data: users, isLoading: usersLoading } = useFetch<User[]>({
    url: ENDPOINTS.users,
  });

  if (companiesLoading || usersLoading) {
    return <span className="font-mono text-sm text-muted-foreground">Loading…</span>;
  }

  const userCompanies = companies?.filter((c) => c.users?.includes(userId)) ?? [];

  if (userCompanies.length === 0) {
    return <span className="font-mono text-sm text-muted-foreground">No companies.</span>;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {userCompanies.map((company) => {
        const members = users?.filter((u) => company.users?.includes(u.id)) ?? [];
        return (
          <div key={company.id} className="rounded-md border border-border p-3 flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
              {company.name}
            </span>
            <div className="flex flex-col gap-1.5">
              {members.map((u) => (
                <div key={u.id} className="flex items-center gap-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={u.avatar} alt={u.name} />
                    <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                      {u.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-mono text-sm text-foreground">{u.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
