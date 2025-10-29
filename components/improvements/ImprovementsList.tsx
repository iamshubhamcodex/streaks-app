"use client";

import {
  ImprovementDataType,
  deleteImprovement,
} from "@/apiService/improvements";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import ImprovementCard from "./ImprovementsCard";

export default function ImprovementList({
  improvements,
}: {
  improvements: ImprovementDataType[];
}) {
  const [incrementingId, setIncrementingId] = useState<string[]>([]);

  const { mutate: deleteImprovementM, isPending: loadingDelete } = useMutation({
    mutationFn: deleteImprovement,
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["improvements"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      }
      if (data.status === "error") alert(data.message);
      setIncrementingId((prev) => prev.filter((p) => p != data.data._id));
    },
  });

  const handleDeleteClick = (id: string) => {
    setIncrementingId((prev) => [...prev, id]);
    deleteImprovementM(id);
  };

  return (
    <Card variant={"md"} className="rounded-[12px]">
      <CardTitle>
        You have {improvements.length} remaining Improvement
        {improvements.length > 1 ? "s" : ""}
      </CardTitle>
      {Array.isArray(improvements) && improvements.length !== 0 && (
        <CardContent className="flex flex-col gap-3">
          {Array.isArray(improvements) &&
            improvements.map((improvement) => (
              <ImprovementCard
                key={improvement._id}
                improvement={improvement}
                loadingDelete={
                  loadingDelete && incrementingId.includes(improvement._id)
                }
                handleDeleteClick={handleDeleteClick}
              />
            ))}
        </CardContent>
      )}
    </Card>
  );
}
