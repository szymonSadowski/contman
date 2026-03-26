import { ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
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
  const { data: users, isLoading: usersLoading } = useFetch<User[]>({
    url: ENDPOINTS.users,
  });
  const { data: companies } = useFetch<Company[]>({
    url: ENDPOINTS.companies,
  });

  if (usersLoading) return <LoadingRows />;

  function getUserCompanies(userId: string): Company[] {
    return companies?.filter((c) => c.users?.includes(userId)) ?? [];
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
              className="border-border group relative transition-colors hover:bg-primary/5"
            >
              <TableCell className="pl-4 py-3">
                <Avatar className="w-8 h-8 ring-1 ring-border group-hover:ring-primary/50 transition-[box-shadow]">
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
                <Link
                  to="/user/$userId"
                  params={{ userId: user.id }}
                  className="font-medium text-foreground after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  {user.name}
                </Link>
              </TableCell>
              <TableCell>
                <span className="font-mono text-xs text-muted-foreground">
                  {user.id.slice(0, 8)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {getUserCompanies(user.id).length > 0 ? (
                    getUserCompanies(user.id).map((c) => (
                      <div key={c.id} className="flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground text-sm">
                          {c.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">—</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="font-mono text-xs text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString(
                    navigator.language,
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </span>
              </TableCell>
              <TableCell className="pr-4">
                <ChevronRight
                  className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors"
                  aria-hidden="true"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
