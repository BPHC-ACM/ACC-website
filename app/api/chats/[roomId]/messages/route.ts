import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { saveMessage } from '../../../../utils/db';
import type { Message } from '../../../../utils/types';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(
	req: Request,
	{ params }: { params: { roomId: string } }
) {
	try {
		const body = await req.json();
		if (!body.id || !body.content) {
			return NextResponse.json(
				{ error: 'Missing fields' },
				{ status: 400 }
			);
		}

		const { roomId } = await params;

		const message: Message = {
			roomid: roomId,
			id: body.id,
			content: body.content,
			timestamp: new Date().toISOString(),
		};

		await saveMessage(message);

		return NextResponse.json({ message, status: 'success' });
	} catch (err: any) {
		console.error('Unexpected Error:', err); // Log unexpected errors
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { roomId: string } }
) {
	const { roomId } = params;

	const { data, error } = await supabase
		.from('chats')
		.select('messages')
		.eq('roomid', roomId)
		.single();

	if (error) {
		console.error('Supabase Error:', error);
		return NextResponse.json({ messages: [] }, { status: 200 });
	}

	return NextResponse.json({ messages: data ? data.messages : [] });
}

export default (req: Request, { params }: { params: { roomId: string } }) => {
	if (req.method === 'GET') {
		return GET(req, { params });
	} else if (req.method === 'POST') {
		return POST(req, { params });
	} else {
		return NextResponse.json(
			{ error: `Method ${req.method} Not Allowed` },
			{ status: 405 }
		);
	}
};
