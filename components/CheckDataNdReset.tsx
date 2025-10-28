"use client";

import { axiosInstance, handleTryCatch } from "@/apiService/apiCaller";
import { isSameDate } from "@/lib/dateUtility";
import { queryClient } from "@/lib/queryClient";
import { useCallback, useEffect } from "react";

export default function CheckDataNdReset() {
  const lastChecked =
    typeof window === "undefined" ? false : localStorage.getItem("lastChecked");

  const checkfor = useCallback(async () => {
    const { status } = await handleTryCatch(
      new Promise((res) => {
        Promise.all([
          axiosInstance.get("/api/streaks/checkStreak"),
          axiosInstance.get("/api/exercises/checkExercise"),
        ]).then((data) => {
          res({ status: 200, data });
        });
      })
    );

    if (status == "success") {
      localStorage.setItem("lastChecked", new Date().toDateString());
      queryClient.invalidateQueries();
    }
  }, []);
  const shouldCheck = useCallback(() => {
    if (!lastChecked) return true;
    if (isSameDate(new Date(), new Date(lastChecked))) return false;

    return true;
  }, [lastChecked]);

  useEffect(() => {
    if (shouldCheck()) checkfor();
  }, [shouldCheck, checkfor]);

  return null;
}
