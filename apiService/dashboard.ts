import { axiosInstance, handleTryCatch } from "./apiCaller";
import { ExerciseDataType } from "./exercises";
import { ImprovementDataType } from "./improvements";
import { StreakDataType } from "./streaks";

export async function getDashboard() {
  return await handleTryCatch<{
    streaks: StreakDataType[];
    exercises: ExerciseDataType[];
    improvements: ImprovementDataType[];
  }>(axiosInstance.get("/api/dashboard"));
}
