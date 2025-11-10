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

  const sortedExercises: ExerciseDataType[][] = useMemo(() => {
    return exercises.reduce(
      (acc, it) => {
        if (!isSameDate(new Date(it.updatedAt), new Date()) || it.count === 0)
          acc[0].push(it);
        else acc[1].push(it);

        return acc;
      },
      [[], []] as ExerciseDataType[][]
    );
  }, [exercises]);

  if (!Array.isArray(exercises)) return null;
  return (
    <>
      {sortedExercises[0].length !== 0 && (
        <Card variant={"md"} className="rounded-[12px]">
          <CardTitle>
            You have {sortedExercises[0].length} remaining Exercise
            {sortedExercises[0].length > 1 ? "s" : ""}
          </CardTitle>
          <CardContent className="flex flex-col gap-3">
            {sortedExercises[0].map((exercise) => (
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
        </Card>
      )}
      {sortedExercises[0].length !== 0 && (
        <Card variant={"md"} className="rounded-[12px]">
          <CardTitle>
            You have completed {sortedExercises[1].length} Exercise
            {remainingExercise > 1 ? "s" : ""}
          </CardTitle>
          <CardContent className="flex flex-col gap-3">
            {sortedExercises[1].map((exercise) => (
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
        </Card>
      )}
    </>
  );
}
