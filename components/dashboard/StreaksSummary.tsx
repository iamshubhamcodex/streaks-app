import { ArrowUpRight, FolderKanban } from "lucide-react";
import { Button } from "../ui/button";
import { Heading, Link, Span } from "../ui/typography";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import { StreakDataType } from "@/apiService/streaks";
import { formatDate } from "@/lib/dateUtility";

export default function StreaksSummary({
  streaks,
}: {
  streaks: StreakDataType[];
}) {
  return (
    <div className="streaksContainer | flex flex-col gap-8 w-full">
      <div className="head | flex items-center justify-between">
        <Heading headingLevel="h2" size={30}>
          Streaks Summary
        </Heading>
        <Link href={"/streaks"}>
          <Button>
            View <ArrowUpRight />
          </Button>
        </Link>
      </div>
      <Card variant={"md"} className="rounded-[12px]">
        {!Array.isArray(streaks) || streaks.length == 0 ? (
          <CardTitle>No Pending Streaks</CardTitle>
        ) : (
          <CardTitle>You have {streaks.length} remaining Streaks</CardTitle>
        )}
        {Array.isArray(streaks) && streaks.length !== 0 && (
          <CardContent className="flex flex-col gap-3">
            {Array.isArray(streaks) &&
              streaks.map((streak) => (
                <Item key={streak._id} variant={"muted"} size={"sm"}>
                  <ItemMedia>
                    <FolderKanban className="size-5" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{streak.title}</ItemTitle>
                    <ItemDescription>{streak.description}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Span weight={"bold"}>{streak.count}</Span>
                    <Span size={14} className="opacity-80">
                      {formatDate(streak.updatedAt)}
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
