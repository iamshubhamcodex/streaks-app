import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Improvements from "@/models/Improvements";

export async function GET() {
  await connectDB();
  const improvements = await Improvements.find();
  return NextResponse.json({ data: improvements, status: "success" });
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const improvement = await Improvements.create(data);
  return NextResponse.json({ status: "success", data: improvement });
}

export async function PUT(req: Request) {
  await connectDB();
  const data = await req.json();
  const improvement = await Improvements.findByIdAndUpdate(data.id, data, {
    new: true,
  });
  return NextResponse.json({ status: "success", data: improvement });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ status: "error", message: "Id Not provided" });
  const improvement = await Improvements.findByIdAndDelete(id);
  return NextResponse.json({ status: "success", data: improvement });
}
