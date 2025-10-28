import { ExerciseDataType } from "@/apiService/exercises";
import { formatDate } from "@/lib/dateUtility";
import { EllipsisVertical, FolderKanban } from "lucide-react";
import { memo } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import { Spinner } from "../ui/spinner";
import { Paragraph, Span } from "../ui/typography";

function ExerciseCard({
  exercise,
  loading,
  handleIncrementClick,
}: {
  exercise: ExerciseDataType;
  loading: boolean;
  handleIncrementClick: (id: string) => void;
}) {
  return (
    <Item key={exercise._id} variant={"muted"} size={"sm"}>
      <ItemMedia>
        <FolderKanban className="size-5" />
      </ItemMedia>
      <ItemContent className="grid grid-cols-2 grow">
        <div className="">
          <ItemTitle>{exercise.title}</ItemTitle>
          <ItemDescription>{exercise.description}</ItemDescription>
        </div>
        <div className="w-max flex flex-col items-end">
          <Paragraph size={18} weight={"bold"}>
            {exercise.count}
          </Paragraph>
          <Span size={12} className="opacity-80">
            {formatDate(exercise.updatedAt)}
          </Span>
        </div>
      </ItemContent>
      <ItemActions>
        <Button
          disabled={loading}
          onClick={() => handleIncrementClick(exercise._id)}
        >
          Increment {loading && <Spinner />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>General</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
}

export default memo(ExerciseCard);
