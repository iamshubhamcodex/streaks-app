"use client";

import { getAllImprovements } from "@/apiService/improvements";
import ImprovementList from "@/components/improvements/ImprovementsList";
import CreateImprovementModalHandler from "@/components/improvements/modal/CreateImprovementModal";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { Spinner } from "@/components/ui/spinner";
import { Heading, Paragraph } from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";

export default function ImprovementsPage() {
  const { data, isPending } = useQuery({
    queryKey: ["improvements"],
    queryFn: getAllImprovements,
  });

  return (
    <div className="dashboardPageContainer">
      <Section>
        <Container className="flex flex-col gap-10">
          <div className="head | flex items-center justify-between">
            <Heading size={30}>Improvements</Heading>
            <CreateImprovementModalHandler />
          </div>
          {isPending ? (
            <Spinner />
          ) : data?.status === "success" ? (
            <>
              <ImprovementList improvements={data?.data} />
            </>
          ) : (
            <Paragraph>{data?.message}</Paragraph>
          )}
        </Container>
      </Section>
    </div>
  );
}
