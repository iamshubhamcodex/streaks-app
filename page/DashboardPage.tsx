import { getDashboard } from "@/apiService/dashboard";
import ExerciseSummary from "@/components/dashboard/ExerciseSummary";
import StreaksSummary from "@/components/dashboard/StreaksSummary";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { Heading, Paragraph } from "@/components/ui/typography";

export default async function DashboardPage() {
  const { status, data, message } = await getDashboard();

  return (
    <div className="dashboardPageContainer">
      <Section>
        <Container className="flex flex-col gap-10">
          <Heading size={60}>Dashboard</Heading>
          {status === "success" ? (
            <>
              <StreaksSummary streaks={data.streaks} />
              <ExerciseSummary exercises={data.exercises} />
            </>
          ) : (
            <Paragraph>{message}</Paragraph>
          )}
        </Container>
      </Section>
    </div>
  );
}
