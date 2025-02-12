import { NextResponse } from "next/server";
import { getChatHistory } from "../../../utils/db";

export async function GET(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const messages = await getChatHistory(params.roomId);
    return NextResponse.json({ messages });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
