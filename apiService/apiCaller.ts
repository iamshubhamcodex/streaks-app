/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
});

export const handleTryCatch = async <T = any>(
  callback: Promise<any>
): Promise<
  | { status: "error"; message: string; data?: never }
  | { status: "success"; data: T; message?: never }
> => {
  try {
    const { data, status } = await callback;

    if (!data || !status.toString().startsWith("2")) {
      return { status: "error", message: "Something went wrong" };
    }
    if (data.status === "error") {
      return { status: "error", message: data.message };
    }

    return { status: "success", data: data.data };
  } catch (err: any) {
    return { status: "error", message: err.message ?? "Something went wrong" };
  }
};
