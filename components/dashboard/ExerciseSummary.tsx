import { ExerciseDataType } from "@/apiService/exercises";
import { formatDate } from "@/lib/dateUtility";
import { ArrowUpRight, FolderKanban } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import { Heading, Link, Paragraph, Span } from "../ui/typography";

export default function ExerciseSummary({
  exercises,
}: {
  exercises: ExerciseDataType[];
}) {
  return (
    <AccordionItem
      value="exercise"
      className="streaksContainer | flex flex-col gap-5 lg:gap-8 w-full"
    >
      <AccordionTrigger className="no-underline hover:no-underline items-center">
        <div className="head | flex items-center justify-between w-full">
          <Heading headingLevel="h2" size={30}>
            Exercises Summary
            {exercises.length > 0 ? ` - ${exercises.length}` : ""}
          </Heading>
          <Link
            href={"/exercises"}
            className="flex items-center gap-1 md:gap-2 py-1 md:py-2 px-2 md:px-4 bg-white/90 text-black/80 rounded-[8px] no-underline hover:no-underline border border-white/80 hover:bg-white/70"
          >
            View <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </AccordionTrigger>
      <AccordionContent>
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
      </AccordionContent>
    </AccordionItem>
  );
}
