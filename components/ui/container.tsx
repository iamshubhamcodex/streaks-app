import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type ContainerPropsType = {
  className?: string;
};

export default function Container({
  children,
  className,
  ...props
}: PropsWithChildren<ContainerPropsType & React.HTMLProps<HTMLDivElement>>) {
  return (
    <div
      className={cn("container | max-w-[1024px] mx-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
}
