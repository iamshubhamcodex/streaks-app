"use client";

import { ExerciseDataType, increaseCount } from "@/apiService/exercises";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardTitle } from "../ui/card";
import ExerciseCard from "./ExerciseCard";
import { useState } from "react";

export default function ExerciseList({
  exercises,
}: {
  exercises: ExerciseDataType[];
}) {
  const [incrementingId, setIncrementingId] = useState<string[]>([]);

  const { mutate: increaseCountM, isPending: loading } = useMutation({
    mutationFn: increaseCount,
    onSuccess: (data) => {
      if (data.status === "success") {
        setIncrementingId((prev) => prev.filter((p) => p != data.data._id));
        alert("Increased count for " + data.data.title);
        queryClient.invalidateQueries({ queryKey: ["exercises"] });
      }
      if (data.status === "error") alert(data.message);
    },
  });

  const handleIncrementClick = (id: string) => {
    increaseCountM(id);
    setIncrementingId((prev) => [...prev, id]);
  };

  return (
    <Card variant={"md"} className="rounded-[12px]">
      <CardTitle>You have {exercises.length} remaining Streaks</CardTitle>
      {Array.isArray(exercises) && exercises.length !== 0 && (
        <CardContent className="flex flex-col gap-3">
          {Array.isArray(exercises) &&
            exercises.map((exercise) => (
              <ExerciseCard
                key={exercise._id}
                exercise={exercise}
                loading={loading && incrementingId.includes(exercise._id)}
                handleIncrementClick={handleIncrementClick}
              />
            ))}
        </CardContent>
      )}
    </Card>
  );
}
