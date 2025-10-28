import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { VariantProps } from "class-variance-authority";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Label, labelVariants, Paragraph } from "./typography";

type DatePickerProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "value" | "onChange" | "type"
> & {
  placeholder?: string;
  value?: Date | string | undefined;
  onChange?: (date?: Date, id?: string, name?: string) => void;
  id?: string;
  name?: string;
};

function DatePicker({
  placeholder,
  value,
  onChange,
  id,
  name,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type={"button"}
          variant={"ghost"}
          className={cn(
            " pl-3 text-left font-normal",
            "border border-border hover:bg-white hover:text-title-text text-title-text",
            "disabled:bg-muted disabled:text-title-text",
            !value && "text-muted-foreground"
          )}
          {...props}
          color="default"
        >
          {value
            ? typeof value === "string"
              ? value
              : value.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
            : placeholder ?? "Select date"}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={typeof value === "string" ? new Date(value) : value}
          captionLayout="dropdown"
          autoFocus
          onChange={(date) => {
            onChange?.(date, id, name);
          }}
          onSelect={(date) => {
            onChange?.(date, id, name);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
type DatePickerGroupPropsType = {
  className?: string;
  label: string;
  labelProps?: React.ComponentProps<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>;
  datePickerProps?: DatePickerProps;
  error?: string;
};
function DatePickerGroup({
  className,
  label,
  labelProps,
  datePickerProps,
  error,
}: DatePickerGroupPropsType) {
  return (
    <div className={cn("datePicker | flex flex-col gap-2 w-full", className)}>
      <Label
        {...(datePickerProps?.id ? { htmlFor: datePickerProps?.id } : {})}
        {...labelProps}
      >
        {label}
      </Label>
      <DatePicker {...datePickerProps} />
      {error && (
        <Paragraph size={14} weight={"medium"} color="destructive">
          {error}
        </Paragraph>
      )}
    </div>
  );
}

export { DatePicker, DatePickerGroup };
