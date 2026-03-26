import type {
  QueryFunctionContext,
  UseQueryOptions,
} from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { BACKEND_URL } from "@/const";

export const queryClient = new QueryClient();

export type FetchConfig<T> = Omit<
  UseQueryOptions<T, Error, T, QueryKeyT>,
  "queryKey" | "queryFn"
>;

export type QueryKeyT = [string, Record<string, string | number | string[]>?];

export const fetcher = async <T>({
  queryKey,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, params] = queryKey;
  return httpClient.get<T>(url, params);
};

export const httpClient = {
  baseURL: BACKEND_URL,

  get: async <T>(
    url: string,
    params?: Record<string, string | number | string[]>,
  ): Promise<T> => {
    const fullUrl = new URL(`${httpClient.baseURL}${url}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => fullUrl.searchParams.append(key, v));
        } else {
          fullUrl.searchParams.set(key, String(value));
        }
      });
    }

    const response = await fetch(fullUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return response.json();
  },
};
