import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL || "http://localhost:3000";

type ApiResult<T> =
  | { data: T; error: null }
  | { data: null; error: string };

async function serverRequest<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  body?: unknown
): Promise<ApiResult<T>> {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(`${API_URL}${path}`, options);
    const data = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        redirect("/login");
      }

      const message = data.error || `Request failed with status ${res.status}`;
      console.error(`[SERVER API ${method} ${path}]`, message);
      return { data: null, error: message };
    }

    return { data: data as T, error: null };
  } catch {
    const message = "Network error. Please check your connection.";
    console.error(`[SERVER API ${method} ${path}]`, message);
    return { data: null, error: message };
  }
}

export const serverApi = {
  get: <T>(path: string) => serverRequest<T>("GET", path),
  post: <T>(path: string, body?: unknown) => serverRequest<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => serverRequest<T>("PUT", path, body),
  patch: <T>(path: string, body?: unknown) => serverRequest<T>("PATCH", path, body),
  delete: <T>(path: string) => serverRequest<T>("DELETE", path),
};
