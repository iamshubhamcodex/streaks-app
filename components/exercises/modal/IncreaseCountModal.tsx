"use client";

import { increaseCount } from "@/apiService/exercises";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Paragraph } from "@/components/ui/typography";
import { queryClient } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  repsDidToday: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const fields: {
  name: keyof FormSchema;
  label: string;
  placeholder?: string;
  type?: string;
}[] = [
  {
    name: "repsDidToday",
    label: "Reps Did",
    placeholder: "Enter number of reps did today",
    type: "number",
  },
];

export default function IncreaseCountModalHandler({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repsDidToday: "0",
    },
  });
  const { mutate: increaseCountM, isPending: loading } = useMutation({
    mutationFn: increaseCount,
    onSuccess: (data) => {
      if (data.status === "success") {
        setOpen(false);
        reset();
        queryClient.invalidateQueries({ queryKey: ["exercises"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      } else {
        alert(data.message ?? "Something went wrong");
      }
    },
  });

  const onSubmit = (values: FormSchema) => {
    increaseCountM({ id, repsDidToday: +values.repsDidToday });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={loading}>Increment {loading && <Spinner />}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Exercise</DialogTitle>
          <DialogDescription>
            Add any exercise that you do not wish to break.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            {fields.map((field) => (
              <Field key={field.name}>
                <FieldLabel>{field.label}</FieldLabel>
                <Input
                  {...register(field.name)}
                  placeholder={field.placeholder}
                  type={field.type || "text"}
                />
                {errors?.[field.name] && (
                  <Paragraph className="text-[14px] text-red-500 font-bold">
                    {errors?.[field.name]?.message}
                  </Paragraph>
                )}
              </Field>
            ))}
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" loading={loading}>
              Increment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
