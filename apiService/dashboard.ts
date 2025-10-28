import { axiosInstance, handleTryCatch } from "./apiCaller";
import { ExerciseDataType } from "./exercises";
import { StreakDataType } from "./streaks";

export async function getDashboard() {
  return await handleTryCatch<{
    streaks: StreakDataType[];
    exercises: ExerciseDataType[];
  }>(axiosInstance.get("/api/dashboard"));
}
