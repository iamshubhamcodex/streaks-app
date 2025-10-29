"use client";

import { getDashboard } from "@/apiService/dashboard";
import ExerciseSummary from "@/components/dashboard/ExerciseSummary";
import ImprovementsSummary from "@/components/dashboard/ImprovementsSummary";
import StreaksSummary from "@/components/dashboard/StreaksSummary";
import { Accordion } from "@/components/ui/accordion";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { Spinner } from "@/components/ui/spinner";
import { Heading, Paragraph } from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const { data, isPending: loading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  return (
    <div className="dashboardPageContainer">
      <Section>
        <Container className="flex flex-col gap-10 lg:gap-20">
          <Heading size={50}>Dashboard</Heading>
          {loading ? (
            <Spinner />
          ) : data?.status === "success" ? (
            <Accordion type="single" collapsible className="w-full">
              <StreaksSummary streaks={data?.data.streaks} />
              <ExerciseSummary exercises={data?.data.exercises} />
              <ImprovementsSummary improvements={data?.data.improvements} />
            </Accordion>
          ) : (
            <Paragraph>{data?.message}</Paragraph>
          )}
        </Container>
      </Section>
    </div>
  );
}
