import { Users, Building2 } from "lucide-react";
import { ENDPOINTS } from "@/const";
import type { User, Company } from "@/types";
import { useFetch } from "@/hooks/useFetch";
import { StatCard } from "./stat-card";

export function Stats() {
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useFetch<User[]>({
    url: ENDPOINTS.users,
  });
  const {
    data: companies,
    isLoading: companiesLoading,
    isError: companiesError,
  } = useFetch<Company[]>({
    url: ENDPOINTS.companies,
  });

  if (usersError && companiesError) return null;

  return (
    <div className="flex gap-3">
      {!usersError && (
        <StatCard
          icon={Users}
          label="Users"
          value={users?.length ?? "—"}
          loading={usersLoading}
        />
      )}
      {!companiesError && (
        <StatCard
          icon={Building2}
          label="Companies"
          value={companies?.length ?? "—"}
          loading={companiesLoading}
        />
      )}
    </div>
  );
}
