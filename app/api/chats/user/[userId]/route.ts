import { NextResponse } from "next/server";
import { getRoomsForUser } from "@/app/utils/db";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const rooms = await getRoomsForUser(params.userId);
    return NextResponse.json({ rooms });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
