import { ChevronRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { ENDPOINTS } from "@/const";
import type { User, Company } from "@/types";
import { useFetch } from "@/hooks/useFetch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LoadingRows } from "./loading-rows";

export function UsersTable() {
  const navigate = useNavigate();
  const { data: users, isLoading: usersLoading } = useFetch<User[]>({
    url: ENDPOINTS.users,
  });
  const { data: companies } = useFetch<Company[]>({
    url: ENDPOINTS.companies,
  });

  if (usersLoading) return <LoadingRows />;

  function getCompany(userId: string): Company | undefined {
    return companies?.find((c) => c.users?.includes(userId));
  }

  function getCompanyName(userId: string) {
    return getCompany(userId)?.name ?? "—";
  }

  function handleRowClick(user: User) {
    const company = getCompany(user.id);
    navigate({
      to: "/user/$userId",
      params: { userId: user.id },
      search: { company: company?.id ?? "" },
    });
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border bg-muted/40 hover:bg-muted/40">
            <TableHead className="w-[52px] pl-4" />
            <TableHead className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
              Name
            </TableHead>
            <TableHead className="w-[80px] text-xs uppercase tracking-widest font-mono text-muted-foreground">
              ID
            </TableHead>
            <TableHead className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
              Company
            </TableHead>
            <TableHead className="text-xs uppercase tracking-widest font-mono text-muted-foreground">
              Joined
            </TableHead>
            <TableHead className="w-[40px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => handleRowClick(user)}
              className="border-border group cursor-pointer transition-colors hover:bg-primary/5"
            >
              <TableCell className="pl-4 py-3">
                <Avatar className="w-8 h-8 ring-1 ring-border group-hover:ring-primary/50 transition-all">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <span className="font-medium text-foreground">{user.name}</span>
              </TableCell>
              <TableCell>
                <span className="font-mono text-xs text-muted-foreground">
                  {user.id.slice(0, 8)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <span className="text-muted-foreground text-sm">
                    {getCompanyName(user.id)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-mono text-xs text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </TableCell>
              <TableCell className="pr-4">
                <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
