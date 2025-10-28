"use client";

import { getAllStreaks } from "@/apiService/streaks";
import StreakList from "@/components/streaks/StreakList";
import CreateStreakModalHandler from "@/components/streaks/modal/CreateStreakModal";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { Spinner } from "@/components/ui/spinner";
import { Heading, Paragraph } from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";

export default function StreaksPage() {
  const { data, isPending } = useQuery({
    queryKey: ["streaks"],
    queryFn: getAllStreaks,
  });

  return (
    <div className="dashboardPageContainer">
      <Section>
        <Container className="flex flex-col gap-10">
          <div className="head | flex items-center justify-between">
            <Heading size={30}>Streaks</Heading>
            <CreateStreakModalHandler />
          </div>
          {isPending ? (
            <Spinner />
          ) : data?.status === "success" ? (
            <>
              <StreakList streaks={data?.data} />
            </>
          ) : (
            <Paragraph>{data?.message}</Paragraph>
          )}
        </Container>
      </Section>
    </div>
  );
}
