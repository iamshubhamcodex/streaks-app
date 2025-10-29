"use client";

import { getAllExercises } from "@/apiService/exercises";
import ExerciseList from "@/components/exercises/ExerciseList";
import CreateExerciseModalHandler from "@/components/exercises/modal/CreateExerciseModal";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { Spinner } from "@/components/ui/spinner";
import { Heading, Paragraph } from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";

export default function ExercisePage() {
  const { data, isPending } = useQuery({
    queryKey: ["exercises"],
    queryFn: getAllExercises,
  });

  return (
    <div className="dashboardPageContainer">
      <Section>
        <Container className="flex flex-col gap-10">
          <div className="head | flex items-center justify-between">
            <Heading size={30}>Exercises</Heading>
            <CreateExerciseModalHandler />
          </div>
          {isPending ? (
            <Spinner />
          ) : data?.status === "success" ? (
            <>
              <ExerciseList exercises={data?.data} />
            </>
          ) : (
            <Paragraph>{data?.message}</Paragraph>
          )}
        </Container>
      </Section>
    </div>
  );
}
