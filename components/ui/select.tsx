"use client";

import { cn } from "@/lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { VariantProps } from "class-variance-authority";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "lucide-react";
import * as React from "react";
import InputLoading from "./inputsLoading";
import { Label, labelVariants, Paragraph } from "./typography";

function SelectBox({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGrouped({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-border min-h-max bg-white text-secondary-foreground data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-secondary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit max-w-full items-center justify-between gap-2 rounded-md border py-2.5 px-3.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:text-muted-foreground disabled:bg-muted data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50 stroke-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-secondary-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export type SelectOptionsType =
  | { id: string; label: string }
  | { title: string; childs: { id: string; label: string }[] }
  | string
  | number;

type SelectPropsType = {
  options: SelectOptionsType[];
  className?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  onChange?: (value: string, name?: string, id?: string) => void;
  onBlur?: (name?: string, id?: string) => void;
};
function Select({
  className,
  options,
  placeholder,
  value,
  name,
  id,
  defaultValue,
  icon,
  disabled,
  required,
  loading,
  onChange,
  onBlur,
}: SelectPropsType) {
  const handleValueChange = (val: string) => {
    if (onChange && typeof onChange === "function") {
      onChange(val, name, id);
    }
  };
  const handleOpenChange = (open: boolean) => {
    if (!open && onBlur && typeof onBlur === "function") {
      onBlur(name, id);
    }
  };

  return (
    <SelectBox
      {...{
        ...(value !== undefined ? { value: String(value) } : {}),
        ...(defaultValue && {
          defaultValue: String(defaultValue),
        }),
        onValueChange: handleValueChange,
        name,
        disabled: loading || disabled,
        required,
      }}
      onOpenChange={handleOpenChange}
    >
      <SelectTrigger className={className}>
        {icon && icon}
        <SelectValue placeholder={placeholder ?? "-Select-"} />
        <InputLoading loading={loading} />
      </SelectTrigger>
      <SelectContent>
        {options.length === 0 && (
          <div className="px-3 py-2 text-sm text-muted-foreground">No item</div>
        )}
        {options.map((option, index) => {
          if (typeof option === "string")
            return (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            );
          if (typeof option === "number")
            return (
              <SelectItem key={index} value={String(option)}>
                {option}
              </SelectItem>
            );
          if ("id" in option)
            return (
              <SelectItem key={index} value={option.id}>
                {option.label}
              </SelectItem>
            );
          if ("title" in option || "childs" in option)
            return (
              <SelectGrouped key={index}>
                {option.title && <SelectLabel>{option.title}</SelectLabel>}
                {option.childs.map((child, ind) => (
                  <SelectItem key={ind} value={child.id}>
                    {child.label}
                  </SelectItem>
                ))}
              </SelectGrouped>
            );

          return <></>;
        })}
      </SelectContent>
    </SelectBox>
  );
}

type SelectGroupPropsType = {
  className?: string;
  label: string;
  labelProps?: React.ComponentProps<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>;
  selectProps: SelectPropsType;
  error?: string;
};
function SelectGroup({
  className,
  label,
  labelProps,
  selectProps,
  error,
}: SelectGroupPropsType) {
  return (
    <div className={cn("select | flex flex-col gap-2", className)}>
      <Label {...labelProps} required={selectProps.required}>
        {label}
      </Label>
      <Select {...selectProps} />
      {error && (
        <Paragraph size={14} weight={"medium"} color="destructive">
          {error}
        </Paragraph>
      )}
    </div>
  );
}

export {
  Select,
  SelectBox,
  SelectContent,
  SelectGroup,
  SelectGrouped,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
};

