/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance, handleTryCatch } from "./apiCaller";

export type StreakDataType = {
  _id: string;
  title: string;
  description: string;
  count: number;
  updatedAt: Date;
  createdAt: Date;
};
export const getAllStreaks = async () => {
  return handleTryCatch<StreakDataType[]>(axiosInstance.get("/api/streaks"));
};
export const createStreak = async (
  body: Omit<StreakDataType, "_id" | "count" | "updatedAt" | "createdAt">
) => {
  return handleTryCatch<StreakDataType>(
    axiosInstance.post("/api/streaks", body)
  );
};
export const updateStreak = async (
  body: Omit<StreakDataType, "_id" | "count" | "updatedAt" | "createdAt"> & {
    id: string;
  }
) => {
  return handleTryCatch<StreakDataType>(
    axiosInstance.put("/api/streaks", body)
  );
};
export const deleteStreak = async (id: string) => {
  const response = await handleTryCatch<StreakDataType>(
    axiosInstance.delete("/api/streaks?id=" + id)
  );
  return {
    ...response,
    data: {
      ...(response?.data ?? {}),
      _id: id,
    },
  };
};
export const increaseCount = async (id: string) => {
  const response = await handleTryCatch<any>(
    axiosInstance.post("/api/streaks/updateCount", { id })
  );
  return {
    ...response,
    data: {
      ...(response?.data ?? {}),
      _id: id,
    },
  };
};
export const checkStreakStatus = async () => {
  return handleTryCatch(axiosInstance.get("/api/streaks/checkStreak"));
};
