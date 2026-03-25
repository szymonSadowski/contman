import { type FetchConfig, fetcher, type QueryKeyT } from "@/lib/query-client";
import { useQuery } from "@tanstack/react-query";

type UseFetch<T> = {
  url: string | null;
  params?: Record<string, string | number | string[]>;
  config?: FetchConfig<T>;
  enabled?: boolean;
};

export const useFetch = <T>({
  url,
  params,
  config,
  enabled = true,
}: UseFetch<T>) => {
  const queryKey: QueryKeyT = [url!, params];

  return useQuery<T, Error, T, QueryKeyT>({
    queryKey,
    queryFn: (query) => fetcher(query),
    enabled: enabled && !!url,
    ...config,
  });
};
