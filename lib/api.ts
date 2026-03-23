type ApiResult<T> =
  | { data: T; error: null }
  | { data: null; error: string };

async function request<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  body?: unknown
): Promise<ApiResult<T>> {
  try {
    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(path, options);
    const data = await res.json();

    if (!res.ok) {
      const message = data.error || `Request failed with status ${res.status}`;

      console.error(`[API ${method} ${path}]`, message);

      return { data: null, error: message };
    }

    return { data: data as T, error: null };
  } catch {
    const message = "Network error. Please check your connection.";
    console.error(`[API ${method} ${path}]`, message);
    return { data: null, error: message };
  }
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};
