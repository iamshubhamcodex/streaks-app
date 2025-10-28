import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import NextLink from "next/link";

const sizeVariants = {
  60: "text-[40px] md:text-[50px] lg:text-[60px]",
  30: "text-[20px] md:text-[25px] lg:text-[30px]",
  24: "text-[24px]",
  20: "text-[20px]",
  18: "text-[18px]",
  16: "text-[16px]",
  14: "text-[14px]",
  12: "text-[12px]",
};
const weightVariants = {
  light: "font-light",
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};
const colorVariant = {
  blue: "text-blue",
  title: "text-title-text",
  subtext: "text-subtext",
  primary: "text-primary-foreground",
  secondary: "text-secondary-foreground",
  destructive: "text-destructive-foreground",
  warning: "text-warning-foreground",
};

export const headingVariants = cva("", {
  variants: {
    size: sizeVariants,
    weight: weightVariants,
    color: colorVariant,
  },
  defaultVariants: {
    size: 16,
    weight: "medium",
    color: "title",
  },
});

type HeadingProps = React.ComponentProps<"h1"> &
  VariantProps<typeof headingVariants> & {
    headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

export function Heading({
  className,
  size,
  weight,
  color,
  headingLevel = "h1",
  ...props
}: HeadingProps) {
  const Comp = headingLevel;

  return (
    <Comp
      className={cn(headingVariants({ size, weight, color, className }))}
      {...props}
    />
  );
}

export const paragraphVariants = cva("", {
  variants: {
    size: sizeVariants,
    weight: weightVariants,
    color: colorVariant,
  },
  defaultVariants: {
    size: 16,
    weight: "medium",
    color: "subtext",
  },
});

type ParagraphProps = React.ComponentProps<"p"> &
  VariantProps<typeof paragraphVariants>;

export function Paragraph({
  className,
  size,
  weight,
  color,
  ...props
}: ParagraphProps) {
  return (
    <p
      className={cn(paragraphVariants({ size, weight, color, className }))}
      {...props}
    />
  );
}

export const linkVariants = cva("hover:underline cursor-pointer", {
  variants: {
    size: sizeVariants,
    weight: weightVariants,
    color: colorVariant,
  },
  defaultVariants: {
    size: 16,
    weight: "medium",
    color: "blue",
  },
});

type LinkProps = React.ComponentProps<typeof NextLink> &
  VariantProps<typeof linkVariants>;

export function Link({ className, size, weight, color, ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(linkVariants({ size, weight, color, className }))}
      {...props}
    />
  );
}

export const labelVariants = cva(
  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      size: sizeVariants,
      weight: weightVariants,
      color: colorVariant,
    },
    defaultVariants: {
      size: 14,
      weight: "medium",
      color: "title",
    },
  }
);

export function Label({
  className,
  size,
  weight,
  color,
  required,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants> & { required?: boolean }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelVariants({ size, weight, color, className }))}
      {...props}
    >
      {props?.children}
      {required && (
        <span className="text-destructive-foreground -ml-1.5">*</span>
      )}
    </LabelPrimitive.Root>
  );
}

export const listVariants = cva("", {
  variants: {
    size: sizeVariants,
    weight: weightVariants,
    color: colorVariant,
  },
  defaultVariants: {
    size: 16,
    weight: "medium",
    color: "title",
  },
});

type ListProps = React.ComponentProps<"li"> & VariantProps<typeof listVariants>;

export function ListItem({
  className,
  size,
  weight,
  color,
  ...props
}: ListProps) {
  return (
    <li
      className={cn(listVariants({ size, weight, color, className }))}
      {...props}
    />
  );
}

export const spanVariants = cva("", {
  variants: {
    size: sizeVariants,
    weight: weightVariants,
    color: colorVariant,
  },
  defaultVariants: {
    size: 16,
    weight: "medium",
    color: "subtext",
  },
});

type SpanProps = React.ComponentProps<"span"> &
  VariantProps<typeof spanVariants>;

export function Span({ className, size, weight, color, ...props }: SpanProps) {
  return (
    <span
      className={cn(spanVariants({ size, weight, color, className }))}
      {...props}
    />
  );
}

export const preVariants = cva("", {
  variants: {
    size: sizeVariants,
    weight: weightVariants,
    color: colorVariant,
  },
  defaultVariants: {
    size: 16,
    weight: "medium",
    color: "subtext",
  },
});

type PreProps = React.ComponentProps<"pre"> &
  VariantProps<typeof preVariants> & { asPara?: boolean };

export function Pre({
  className,
  size,
  weight,
  color,
  asPara = true,
  ...props
}: PreProps) {
  return (
    <pre
      className={cn(preVariants({ size, weight, color, className }))}
      {...props}
      style={{
        ...(props?.style ?? {}),
        ...(asPara
          ? {
              wordBreak: "break-word",
              wordWrap: "break-word",
              fontFamily: "'Inter', sans-sarif",
              whiteSpace: "break-spaces",
            }
          : {}),
      }}
    />
  );
}
