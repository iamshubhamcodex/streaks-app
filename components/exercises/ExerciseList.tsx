"use client";

import { ExerciseDataType, deleteExercise } from "@/apiService/exercises";
import { isSameDate } from "@/lib/dateUtility";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import ExerciseCard from "./ExerciseCard";

export default function ExerciseList({
  exercises,
}: {
  exercises: ExerciseDataType[];
}) {
  const [incrementingId, setIncrementingId] = useState<string[]>([]);

  const { mutate: deleteExerciseM, isPending: loadingDelete } = useMutation({
    mutationFn: deleteExercise,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["exercises"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      }
      if (data.status === "error") alert(data.message);
      setIncrementingId((prev) => prev.filter((p) => p != data.data._id));
    },
  });
  const remainingExercise = useMemo(() => {
    return exercises.filter(
      (exercise) =>
        !isSameDate(new Date(exercise.updatedAt), new Date()) ||
        exercise.count == 0
    ).length;
  }, [exercises]);

  const handleDeleteClick = (id: string) => {
    setIncrementingId((prev) => [...prev, id]);
    deleteExerciseM(id);
  };

  return (
    <Card variant={"md"} className="rounded-[12px]">
      <CardTitle>
        You have {remainingExercise} remaining Exercise
        {remainingExercise > 1 ? "s" : ""}
      </CardTitle>
      {Array.isArray(exercises) && exercises.length !== 0 && (
        <CardContent className="flex flex-col gap-3">
          {Array.isArray(exercises) &&
            exercises.map((exercise) => (
              <ExerciseCard
                key={exercise._id}
                exercise={exercise}
                loadingDelete={
                  loadingDelete && incrementingId.includes(exercise._id)
                }
                handleDeleteClick={handleDeleteClick}
              />
            ))}
        </CardContent>
      )}
    </Card>
  );
}
