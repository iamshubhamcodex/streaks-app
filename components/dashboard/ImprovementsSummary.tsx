import { ImprovementDataType } from "@/apiService/improvements";
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

export default function ImprovementsSummary({
  improvements,
}: {
  improvements: ImprovementDataType[];
}) {
  return (
    <AccordionItem
      value="improvements"
      className="improvementsContainer | flex flex-col gap-5 lg:gap-8 w-full"
    >
      <AccordionTrigger className="no-underline hover:no-underline items-center">
        <div className="head | flex items-center justify-between w-full">
          <Heading headingLevel="h2" size={30}>
            Improvements Summary
            {improvements.length > 0 ? ` - ${improvements.length}` : ""}
          </Heading>
          <Link
            href={"/improvements"}
            className="flex items-center gap-1 md:gap-2 py-1 md:py-2 px-2 md:px-4 bg-white/90 text-black/80 rounded-[8px] no-underline hover:no-underline border border-white/80 hover:bg-white/70"
          >
            View <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Card variant={"md"} className="rounded-[12px]">
          {!Array.isArray(improvements) || improvements.length == 0 ? (
            <CardTitle>
              <Paragraph>No Pending Improvements</Paragraph>
            </CardTitle>
          ) : (
            <CardTitle>
              <Paragraph>
                You have {improvements.length} remaining Improvement
                {improvements.length > 1 ? "s" : ""}
              </Paragraph>
            </CardTitle>
          )}
          {Array.isArray(improvements) && improvements.length !== 0 && (
            <CardContent className="flex flex-col gap-3">
              {Array.isArray(improvements) &&
                improvements.map((improvement) => (
                  <Item key={improvement._id} variant={"muted"} size={"sm"}>
                    <div className="flex gap-2 grow">
                      <ItemMedia>
                        <FolderKanban className="size-5" />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{improvement.title}</ItemTitle>
                        <ItemDescription>
                          {improvement.description}
                        </ItemDescription>
                      </ItemContent>
                    </div>
                    <ItemActions className="flex justify-end grow">
                      <Span size={14} className="opacity-80">
                        {formatDate(improvement.updatedAt)}
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
