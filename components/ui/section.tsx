import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type ContainerPropsType = {
  className?: string;
};

export default function Section({
  children,
  className,
  ...props
}: PropsWithChildren<ContainerPropsType & React.HTMLProps<HTMLDivElement>>) {
  return (
    <section
      className={cn(
        "section | w-screen h-max py-4 md:py-10 lg:py-20 px-4 md:px-15 lg:px-20",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
