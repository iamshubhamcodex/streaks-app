import { connectDB } from "@/lib/mongoose";
import { isSameDate } from "@/lib/dateUtility";
import Streak from "@/models/Streak";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const streaks = await Streak.find();

  if (!streaks)
    return NextResponse.json({ status: "error", message: "No Streak Found" });

  const streakBreakDate = new Date();
  streakBreakDate.setDate(streakBreakDate.getDate() - 2);

  let updatedAny = false;
  streaks.forEach(async (streak) => {
    if (isSameDate(streak.updatedAt, streakBreakDate)) {
      streak.count = 0;
      updatedAny = true;
      await streak.save();
    }
  });

  return NextResponse.json({status: "success", message: updatedAny ? "Some streaks were broken" :"Checked Streak"});
}
