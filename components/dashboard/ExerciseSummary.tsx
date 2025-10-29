import { ArrowUpRight, FolderKanban } from "lucide-react";
import { Button } from "../ui/button";
import { Heading, Link, Paragraph, Span } from "../ui/typography";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import { ExerciseDataType } from "@/apiService/exercises";
import { formatDate } from "@/lib/dateUtility";

export default function ExerciseSummary({
  exercises,
}: {
  exercises: ExerciseDataType[];
}) {
  return (
    <div className="streaksContainer | flex flex-col gap-5 lg:gap-8 w-full">
      <div className="head | flex items-center justify-between">
        <Heading headingLevel="h2" size={30}>
          Exercises Summary
        </Heading>
        <Link href={"/exercises"}>
          <Button>
            View <ArrowUpRight />
          </Button>
        </Link>
      </div>
      <Card variant={"md"} className="rounded-[12px]">
        {!Array.isArray(exercises) || exercises.length == 0 ? (
          <CardTitle>
            <Paragraph>No Pending Exercises</Paragraph>
          </CardTitle>
        ) : (
          <CardTitle>
            <Paragraph>
              You have {exercises.length} remaining Exercise
              {exercises.length > 1 ? "s" : ""}
            </Paragraph>
          </CardTitle>
        )}
        {Array.isArray(exercises) && exercises.length !== 0 && (
          <CardContent className="flex flex-col gap-3">
            {exercises.map((exercise) => (
              <Item key={exercise._id} variant={"muted"} size={"sm"}>
                <div className="flex gap-2 grow">
                  <ItemMedia>
                    <FolderKanban className="size-5" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{exercise.title}</ItemTitle>
                    <ItemDescription>{exercise.description}</ItemDescription>
                  </ItemContent>
                </div>
                <ItemActions className="flex justify-end grow">
                  <Span weight={"bold"}>{exercise.count}</Span>
                  <Span size={14} className="opacity-80">
                    {formatDate(exercise.updatedAt)}
                  </Span>
                </ItemActions>
              </Item>
            ))}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
