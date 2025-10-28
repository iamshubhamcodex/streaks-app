import { connectDB } from "@/lib/mongoose";
import Streak from "@/models/Streak";
import Exercise from "@/models/Exercise";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const streaks = await Streak.find({
    $or: [
      { updatedAt: { $lt: startOfDay } },
      { updatedAt: { $gt: endOfDay } },
      { count: 0 },
    ],
  });
  const exercises = await Exercise.find({
    $or: [
      { updatedAt: { $lt: startOfDay } },
      { updatedAt: { $gt: endOfDay } },
      { count: 0 },
    ],
  });

  return NextResponse.json({
    status: "success",
    data: {
      streaks,
      exercises,
    },
  });
}
