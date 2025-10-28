import { connectDB } from "@/lib/mongoose";
import { isSameDate } from "@/lib/dateUtility";
import Streak from "@/models/Streak";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const streak = await Streak.findById(data.id);

  if (!streak)
    return NextResponse.json({ status: "error", message: "No Streak Found" });

  if (isSameDate(streak.updatedAt, new Date()) && streak.count !== 0)
    return NextResponse.json({
      status: "error",
      message: "Already updated today",
    });

  streak.count = streak.count + 1;
  await streak.save();
  return NextResponse.json({ status: "success", data: streak });
}
