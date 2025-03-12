import ky from "ky";

import { SECOND } from "@/constants/date";

interface ApiClientOptions {
  prefixUrl: string;
  timeout?: number;
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T;
  status: number;
}

export class ApiClient {
  private client: typeof ky;

  constructor(options: ApiClientOptions) {
    this.client = ky.create({
      prefixUrl: options.prefixUrl,
      timeout: options.timeout || SECOND * 30,
      credentials: options.credentials || "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  }

  async get<T>(path: string): Promise<ApiResponse<T>> {
    const response = await this.client.get(path);
    const data = await response.json<T>();

    return {
      data,
      status: response.status,
    };
  }

  async post<T, D = unknown>(path: string, data?: D): Promise<ApiResponse<T>> {
    const response = await this.client.post(path, {
      json: data,
    });
    const responseData = await response.json<T>();

    return {
      data: responseData,
      status: response.status,
    };
  }

  async put<T, D = unknown>(path: string, data?: D): Promise<ApiResponse<T>> {
    const response = await this.client.put(path, {
      json: data,
    });
    const responseData = await response.json<T>();

    return {
      data: responseData,
      status: response.status,
    };
  }

  async delete<T>(path: string): Promise<ApiResponse<T>> {
    const response = await this.client.delete(path);
    const data = await response.json<T>();

    return {
      data,
      status: response.status,
    };
  }
}

export const restClient = new ApiClient({
  prefixUrl: import.meta.env.VITE_API_URL,
});
