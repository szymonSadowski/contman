import { Users, Building2 } from "lucide-react";
import { ENDPOINTS } from "@/const";
import type { User, Company } from "@/types";
import { useFetch } from "@/hooks/useFetch";
import { StatCard } from "./stat-card";

export function Stats() {
  const { data: users, isLoading: usersLoading } = useFetch<User[]>({
    url: ENDPOINTS.users,
  });
  const { data: companies, isLoading: companiesLoading } = useFetch<Company[]>({
    url: ENDPOINTS.companies,
  });

  return (
    <div className="flex gap-3">
      <StatCard
        icon={Users}
        label="Users"
        value={users?.length ?? "—"}
        loading={usersLoading}
      />
      <StatCard
        icon={Building2}
        label="Companies"
        value={companies?.length ?? "—"}
        loading={companiesLoading}
      />
    </div>
  );
}
