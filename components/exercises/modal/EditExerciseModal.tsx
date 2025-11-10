"use client";

import { updateExercise } from "@/apiService/exercises";
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
import { Textarea } from "@/components/ui/textarea";
import { Paragraph } from "@/components/ui/typography";
import { queryClient } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2, "Should be greater than 2 characters"),
  description: z.string().optional(),
  reps: z.string(),
  autoIncrease: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const fields: {
  name: keyof FormSchema;
  label: string;
  placeholder?: string;
  type?: string;
  inputType?: "textarea" | "input";
}[] = [
  { name: "title", label: "Title", placeholder: "Enter exercise title" },
  {
    name: "description",
    label: "Description",
    placeholder: "Describe your exercise",
    inputType: "textarea",
  },
  {
    name: "reps",
    label: "Reps",
    type: "text",
    placeholder: "Enter total reps",
  },
  {
    name: "autoIncrease",
    type: "text",
    label: "Increase Reps",
    placeholder: "Enter Increase Reps",
  },
];

export default function EditExerciseModal({
  id,
  title,
  description,
  reps,
  autoIncrease,
}: {
  id: string;
  title: string;
  description: string;
  reps: number;
  autoIncrease: number;
}) {
  const [open, setOpen] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ?? "",
      description: description ?? "",
      reps: String(reps ?? 10),
      autoIncrease: String(autoIncrease ?? 3),
    },
  });
  const { mutate: updateExerciseM, isPending: loading } = useMutation({
    mutationFn: updateExercise,
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
    updateExerciseM({
      id,
      title: values.title ?? "",
      description: values.description ?? "",
      reps: +(values.reps ?? "10"),
      autoIncrease: +(values.autoIncrease ?? "5"),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="w-full py-1.5 px-2 gap-3 justify-start rounded-[6px]"
        >
          <Pencil stroke="#fff" /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Exercise</DialogTitle>
          <DialogDescription>
            {" "}
            Edit the details of Exercise to best fit your need.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            {fields.map((field) => (
              <Field key={field.name}>
                <FieldLabel>{field.label}</FieldLabel>
                {field.inputType && field.inputType === "textarea" ? (
                  <Textarea
                    {...register(field.name)}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <Input
                    {...register(field.name)}
                    placeholder={field.placeholder}
                    type={field.type || "text"}
                  />
                )}
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
              Update Exercise
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
