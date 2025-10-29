/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance, handleTryCatch } from "./apiCaller";

export type ExerciseDataType = {
  _id: string;
  title: string;
  description: string;
  count: number;
  reps: number;
  autoIncrease: number;
  updatedAt: Date;
  createdAt: Date;
};
export const getAllExercises = async () => {
  return handleTryCatch<ExerciseDataType[]>(
    axiosInstance.get("/api/exercises")
  );
};
export const createExercise = async (
  body: Omit<ExerciseDataType, "_id" | "count" | "updatedAt" | "createdAt">
) => {
  return handleTryCatch<ExerciseDataType>(
    axiosInstance.post("/api/exercises", body)
  );
};
export const updateExercise = async (
  body: Omit<ExerciseDataType, "_id" | "count" | "updatedAt" | "createdAt"> & {
    id: string;
  }
) => {
  return handleTryCatch<ExerciseDataType>(
    axiosInstance.put("/api/exercises", body)
  );
};
export const deleteExercise = async (id: string) => {
  const response = await handleTryCatch<ExerciseDataType>(
    axiosInstance.delete("/api/exercises?id=" + id)
  );
  return {
    ...response,
    data: {
      ...(response?.data ?? {}),
      _id: id,
    },
  };
};
export const increaseCount = async ({
  id,
  repsDidToday,
}: {
  id: string;
  repsDidToday: number;
}) => {
  const response = await handleTryCatch<any>(
    axiosInstance.post("/api/exercises/updateCount", { id, repsDidToday })
  );
  return {
    ...response,
    data: {
      ...(response?.data ?? {}),
      _id: id,
    },
  };
};
export const checkExerciseStatus = async () => {
  return handleTryCatch(axiosInstance.get("/api/exercises/checkExercise"));
};
