"use client";

import {
  StreakDataType,
  deleteStreak,
  increaseCount,
} from "@/apiService/streaks";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardTitle } from "../ui/card";
import StreakCard from "./StreakCard";
import { useMemo, useState } from "react";
import { isSameDate } from "@/lib/dateUtility";

export default function StreakList({ streaks }: { streaks: StreakDataType[] }) {
  const [incrementingId, setIncrementingId] = useState<string[]>([]);

  const { mutate: increaseCountM, isPending: loadingIncrease } = useMutation({
    mutationFn: increaseCount,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["streaks"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      }
      if (data.status === "error") alert(data.message);
      setIncrementingId((prev) => prev.filter((p) => p != data.data._id));
    },
  });
  const { mutate: deleteStreakM, isPending: loadingDelete } = useMutation({
    mutationFn: deleteStreak,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["streaks"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      }
      if (data.status === "error") alert(data.message);
      setIncrementingId((prev) => prev.filter((p) => p != data.data._id));
    },
  });
  const remainingStreaks = useMemo(() => {
    return streaks.filter(
      (streak) =>
        !isSameDate(new Date(streak.updatedAt), new Date()) || streak.count == 0
    ).length;
  }, [streaks]);

  const handleIncrementClick = (id: string) => {
    setIncrementingId((prev) => [...prev, id]);
    increaseCountM(id);
  };
  const handleDeleteClick = (id: string) => {
    setIncrementingId((prev) => [...prev, id]);
    deleteStreakM(id);
  };

const sortedStreaks: StreakDataType[] = useMemo(() => {
  return streaks
    .reduce(
      (acc, it) => {
        if (!isSameDate(new Date(it.updatedAt), new Date()) || it.count === 0)
          acc[0].push(it);
        else acc[1].push(it);

        return acc;
      },
      [[], []] as StreakDataType[][]
    )
    .reduce((acc, it) => [...acc, ...it], []);
}, [streaks]);

return (
  <Card variant={"md"} className="rounded-[12px]">
    <CardTitle>
      You have {remainingStreaks} remaining Streak
      {remainingStreaks > 1 ? "s" : ""}
    </CardTitle>
    {Array.isArray(streaks) && streaks.length !== 0 && (
      <CardContent className="flex flex-col gap-3">
        {Array.isArray(streaks) &&
          sortedStreaks.map((streak) => (
            <StreakCard
              key={streak._id}
              streak={streak}
              loading={loadingIncrease && incrementingId.includes(streak._id)}
              loadingDelete={
                loadingDelete && incrementingId.includes(streak._id)
              }
              handleIncrementClick={handleIncrementClick}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
      </CardContent>
    )}
  </Card>
);
}
