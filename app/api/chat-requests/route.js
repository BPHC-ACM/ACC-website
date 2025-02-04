import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { formatDistanceToNow } from 'date-fns';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Create a .env.local in the project root directory and add the following:

// SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a2R3Y3F4cWlyb2hucGxldGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NTA3NTgsImV4cCI6MjA1NDIyNjc1OH0.vQ5C9_onYsma85zA4402q4udtSnilu5uEmmA5d7qMGg

// SUPABASE_URL = https://xvkdwcqxqirohnpleteu.supabase.co

export async function GET() {
	const { data, error } = await supabase
		.from('requests')
		.select('name, iconurl, text, cgpa, branch, created_at');

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	const requestsWithRelativeTime = data.map((request) => {
		const utcDate = new Date(request.created_at);

		const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);

		return {
			...request,
			relativeTime: formatDistanceToNow(istDate, { addSuffix: true }),
		};
	});

	return NextResponse.json({
		requests: requestsWithRelativeTime,
		totalRequests: requestsWithRelativeTime.length,
	});
}
