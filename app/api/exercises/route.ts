import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Exercise from "@/models/Exercise";

export async function GET() {
  await connectDB();
  const exercise = await Exercise.find();
  return NextResponse.json({ status: "success", data: exercise });
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const payload = {
    ...data,
    count: Number(data.count) || 0,
    reps: Number(data.reps) || 0,
    autoIncrease: Number(data.autoIncrease) || 0,
  };

  const exercise = await Exercise.create(payload);
  return NextResponse.json({ status: "success", data: exercise });
}

export async function PUT(req: Request) {
  await connectDB();
  const data = await req.json();
  const exercise = await Exercise.findByIdAndUpdate(data.id, data, {
    new: true,
  });
  return NextResponse.json({ status: "success", data: exercise });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ status: "error", message: "Id Not provided" });
  const exercise = await Exercise.findByIdAndDelete(id);
  return NextResponse.json({ status: "success", data: exercise });
}
