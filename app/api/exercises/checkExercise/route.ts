import { connectDB } from "@/lib/mongoose";
import { isSameDate } from "@/lib/dateUtility";
import Exercise from "@/models/Exercise";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const exercises = await Exercise.find();

  if (!exercises)
    return NextResponse.json({ status: "error", message: "No Exercise Found" });

  const exerciseBreakDate = new Date();
  exerciseBreakDate.setDate(exerciseBreakDate.getDate() - 2);

  let updatedAny = false;
  exercises.forEach(async (exercise) => {
    if (isSameDate(exercise.updatedAt, exerciseBreakDate)) {
      exercise.count = 0;
      exercise.continuousDays = 0;
      updatedAny = true;
      await exercise.save();
    }
  });

  return NextResponse.json({status: "success", message: updatedAny ? "Some exercises were broken" :"Checked Exercise"});
}
