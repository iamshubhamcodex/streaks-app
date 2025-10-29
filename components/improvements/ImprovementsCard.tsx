import { ImprovementDataType } from "@/apiService/improvements";
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
import { Span } from "../ui/typography";
import EditImprovementModal from "./modal/EditImprovementModal";

function ImprovementCard({
  improvement,
  loadingDelete,
  handleDeleteClick,
}: {
  improvement: ImprovementDataType;
  loadingDelete: boolean;
  handleDeleteClick: (id: string) => void;
}) {
  return (
    <Item
      key={improvement._id}
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
            <ItemTitle>{improvement.title}</ItemTitle>
            <ItemDescription>{improvement.description}</ItemDescription>
          </div>
          <div className="w-max flex flex-col items-end justify-center">
            <Span size={12} className="opacity-80 min-w-max">
              {formatDate(improvement.updatedAt)}
            </Span>
          </div>
        </ItemContent>
      </div>
      <ItemActions className="flex justify-end">
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
                <EditImprovementModal
                  id={improvement._id}
                  title={improvement.title}
                  description={improvement.description}
                />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex gap-3 items-center"
                onClick={() => handleDeleteClick(improvement._id)}
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

export default memo(ImprovementCard);
