import { StreakDataType } from "@/apiService/streaks";
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
import EditStreakModal from "./modal/EditStreakModal";

function StreakCard({
  streak,
  loading,
  loadingDelete,
  handleIncrementClick,
  handleDeleteClick,
}: {
  streak: StreakDataType;
  loading: boolean;
  loadingDelete: boolean;
  handleIncrementClick: (id: string) => void;
  handleDeleteClick: (id: string) => void;
}) {
  return (
    <Item key={streak._id} variant={"muted"} size={"sm"}>
      <ItemMedia>
        <FolderKanban className="size-5" />
      </ItemMedia>
      <ItemContent className="grid grid-cols-2 grow">
        <div className="">
          <ItemTitle>{streak.title}</ItemTitle>
          <ItemDescription>{streak.description}</ItemDescription>
        </div>
        <div className="w-max flex flex-col items-end">
          <Paragraph size={18} weight={"bold"}>
            {streak.count}
          </Paragraph>
          <Span size={12} className="opacity-80">
            {formatDate(streak.updatedAt)}
          </Span>
        </div>
      </ItemContent>
      <ItemActions>
        <Button
          disabled={loading}
          onClick={() => handleIncrementClick(streak._id)}
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
              <DropdownMenuItem className="flex gap-3 items-cente" asChild>
                <EditStreakModal
                  id={streak._id}
                  title={streak.title}
                  description={streak.description}
                />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex gap-3 items-center"
                onClick={() => handleDeleteClick(streak._id)}
              >
                {loadingDelete ? <Spinner /> : <Trash stroke="#fff" />}
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
}

export default memo(StreakCard);
