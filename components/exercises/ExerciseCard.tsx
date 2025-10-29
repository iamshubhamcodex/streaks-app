import { ExerciseDataType } from "@/apiService/exercises";
import { formatDate } from "@/lib/dateUtility";
import { EllipsisVertical, FolderKanban, Trash } from "lucide-react";
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
import EditExerciseModal from "./modal/EditExerciseModal";
import IncreaseCountModalHandler from "./modal/IncreaseCountModal";

function ExerciseCard({
  exercise,
  loadingDelete,
  handleDeleteClick,
}: {
  exercise: ExerciseDataType;
  loadingDelete: boolean;
  handleDeleteClick: (id: string) => void;
}) {
  return (
    <Item
      key={exercise._id}
      variant={"muted"}
      size={"sm"}
      className="flex gap-3 md:gap-4 flex-row flex-wrap md:flex-nowrap justify-end"
    >
      <div className="flex gap-3 md:gap-4 grow">
        <ItemMedia>
          <FolderKanban className="size-5" />
        </ItemMedia>
        <ItemContent className="flex-row gap-3 flex-1 grow">
          <div className="grow">
            <ItemTitle>{exercise.title}</ItemTitle>
            <ItemDescription>{exercise.description}</ItemDescription>
          </div>
          <div className="w-max flex flex-col items-end">
            <Paragraph size={18} weight={"bold"}>
              {exercise.continuousDays} / {exercise.reps}
            </Paragraph>
            <Span size={12} className="opacity-80 min-w-max">
              {formatDate(exercise.updatedAt)}
            </Span>
          </div>
        </ItemContent>
      </div>
      <ItemActions className="flex justify-end">
        <IncreaseCountModalHandler id={exercise._id} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>General</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex gap-3 items-cente" asChild>
                <EditExerciseModal
                  id={exercise._id}
                  title={exercise.title}
                  description={exercise.description}
                  reps={exercise.reps}
                  autoIncrease={exercise.autoIncrease}
                />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex gap-3 items-center"
                onClick={() => handleDeleteClick(exercise._id)}
                asChild
              >
                <Button
                  variant={"ghost"}
                  className="w-full py-1.5 px-2 gap-3 justify-start rounded-[6px]"
                >
                  {loadingDelete ? <Spinner /> : <Trash stroke="#fff" />}
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
}

export default memo(ExerciseCard);
