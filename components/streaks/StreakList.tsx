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
import { useState } from "react";

export default function StreakList({ streaks }: { streaks: StreakDataType[] }) {
  const [incrementingId, setIncrementingId] = useState<string[]>([]);

  const { mutate: increaseCountM, isPending: loadingIncrease } = useMutation({
    mutationFn: increaseCount,
    onSuccess: (data) => {
      console.log(data);
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["streaks"] });
        alert("Increased count for " + data.data.title);
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
        alert("Delete Streak " + data.data.title);
      }
      if (data.status === "error") alert(data.message);
      setIncrementingId((prev) => prev.filter((p) => p != data.data._id));
    },
  });

  const handleIncrementClick = (id: string) => {
    setIncrementingId((prev) => [...prev, id]);
    increaseCountM(id);
  };
  const handleDeleteClick = (id: string) => {
    setIncrementingId((prev) => [...prev, id]);
    deleteStreakM(id);
  };

  return (
    <Card variant={"md"} className="rounded-[12px]">
      <CardTitle>You have {streaks.length} remaining Streaks</CardTitle>
      {Array.isArray(streaks) && streaks.length !== 0 && (
        <CardContent className="flex flex-col gap-3">
          {Array.isArray(streaks) &&
            streaks.map((streak) => (
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
