import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Streak from "@/models/Streak";

export async function GET() {
  await connectDB();
  const streaks = await Streak.find();
  return NextResponse.json({ data: streaks, status: "success" });
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const streak = await Streak.create(data);
  return NextResponse.json({ status: "success", data: streak });
}

export async function PUT(req: Request) {
  await connectDB();
  const data = await req.json();
  const streak = await Streak.findByIdAndUpdate(data.id, data, { new: true });
  return NextResponse.json({ status: "success", data: streak });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ status: "error", message: "Id Not provided" });
  const streak = await Streak.findByIdAndDelete(id);
  return NextResponse.json({ status: "success", data: streak });
}
