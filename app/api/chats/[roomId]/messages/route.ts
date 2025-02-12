import { NextResponse } from "next/server";
import { saveMessage } from "../../../../utils/db";
import type { Message } from "../../../../utils/types";

export async function POST(
  req: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const body = await req.json();
    if (!body.name || !body.content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const message: Message = {
      roomid: params.roomId,
      name: body.name,
      content: body.content,
      timestamp: new Date().toISOString(),
    };

    await saveMessage(message);

    return NextResponse.json({ message, status: "success" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
