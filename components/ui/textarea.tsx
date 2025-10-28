import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Label, labelVariants, Paragraph } from "./typography";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

type TextareaGroupPropsType = {
  className?: string;
  label: string;
  labelProps?: React.ComponentProps<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>;
  textareaProps?: React.ComponentProps<"textarea"> & {
    icon?: React.ReactNode;
  };
  error?: string;
};
function TextareaGroup({
  className,
  label,
  labelProps,
  textareaProps,
  error,
}: TextareaGroupPropsType) {
  return (
    <div className={cn("textarea | flex flex-col gap-2", className)}>
      <Label
        {...(textareaProps?.id ? { htmlFor: textareaProps?.id } : {})}
        {...labelProps}
        required={textareaProps?.required}
      >
        {label}
      </Label>
      <Textarea {...textareaProps} />
      {error && (
        <Paragraph size={14} weight={"medium"} color="destructive">
          {error}
        </Paragraph>
      )}
    </div>
  );
}

export { Textarea, TextareaGroup };
