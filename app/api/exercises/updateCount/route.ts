import { connectDB } from "@/lib/mongoose";
import { isSameDate } from "@/lib/dateUtility";
import Exercise from "@/models/Exercise";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const exercise = await Exercise.findById(data.id);

  if (!exercise)
    return NextResponse.json({ status: "error", message: "No Exercise Found" });

  if (isSameDate(exercise.updatedAt, new Date()) && exercise.count !== 0)
    return NextResponse.json({
      status: "error",
      message: "Already updated today",
    });

  exercise.count = exercise.count + 1;
  await exercise.save();
  return NextResponse.json({ status: "success", data: exercise });
}
