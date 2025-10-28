import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const colorVariant = {
  default: "",
  blue: "text-blue",
  title: "text-title-text",
  subtext: "text-subtext",
  primary: "text-primary-foreground",
  secondary: "text-secondary-foreground",
  destructive: "text-destructive-foreground",
  warning: "text-warning-foreground",
};
const weightVariants = {
  light: "font-light",
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xs text-sm font-medium cursor-pointer transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border bg-primary text-primary-foreground border-primary shadow-xs hover:bg-primary/75 disabled:bg-muted disabled:text-muted-foreground disabled:border-border",
        outline:
          "border border-primary bg-secondary text-primary shadow-xs hover:bg-primary/75 hover:text-primary-foreground disabled:opacity-50",
        secondary:
          "border bg-secondary text-secondary-foreground shadow-xs hover:bg-muted disabled:opacity-50",
        success:
          "border bg-success-foreground text-primary-foreground shadow-xs hover:bg-success-foreground/80 disabled:opacity-50",
        destructive:
          "border bg-destructive-foreground text-white shadow-xs hover:bg-destructive-foreground/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 disabled:opacity-50",
        destructiveOutlined:
          "border border-destructive-foreground bg-primary-foreground text-destructive-foreground shadow-xs hover:text-destructive-foreground hover:bg-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 disabled:opacity-50",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "!p-0 !px-0 !py-0 text-subtext underline-offset-4",
        muted:
          "bg-background text-muted-foreground hover:bg-primary hover:text-primary-foreground",
      },
      size: {
        default: "py-2 px-4 rounded-md",
        xs: "py-1.5 px-2 rounded-xs",
        sm: "py-1.5 px-2 rounded-xs",
        md: "py-2.5 px-3 rounded-xs",
        lg: "py-3 px-3.5 rounded-xs",
      },
      color: colorVariant,
      weight: weightVariants,
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "default",
      weight: "regular",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading,
  color,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, color, className }))}
      {...props}
      disabled={loading || props.disabled}
    >
      {props.children}
      {loading && <Spinner />}
    </Comp>
  );
}

export { Button, buttonVariants };
