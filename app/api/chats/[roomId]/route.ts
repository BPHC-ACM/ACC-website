import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req, { params }) {
	const { roomId } = await params;

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
