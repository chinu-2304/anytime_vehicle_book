import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Booking from "@/models/booking.model";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb();

    const { id } = await context.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    booking.status = "completed";

    await booking.save();

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    );
  }
}
