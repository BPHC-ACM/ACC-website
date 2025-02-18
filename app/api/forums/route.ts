import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Fetch all queries with answers
export async function GET() {
	try {
		const { data: queriesData, error: queriesError } = await supabase
			.from('queries')
			.select('*')
			.order('created_at', { ascending: false });

		if (queriesError) throw queriesError;

		const { data: answersData, error: answersError } = await supabase
			.from('answers')
			.select('*');

		if (answersError) throw answersError;

		const mappedQueries = queriesData.map((query) => ({
			...query,
			answers: answersData.filter(
				(answer) => answer.query_id === query.id
			),
		}));

		return NextResponse.json({ success: true, data: mappedQueries });
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 }
		);
	}
}

// Post a new query
export async function POST(req: Request) {
	try {
		const { title, query, tags } = await req.json();

		if (!title.trim() || !query.trim()) {
			return NextResponse.json(
				{ success: false, error: 'Title and query are required.' },
				{ status: 400 }
			);
		}

		const newQuery = {
			id: crypto.randomUUID(),
			name: 'Student',
			title,
			query,
			tags: tags.split(',').map((tag: string) => tag.trim()),
			created_at: new Date().toISOString(),
			student_id: '2023A8H',
		};

		const { error } = await supabase.from('queries').insert([newQuery]);
		if (error) throw error;

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 }
		);
	}
}

// Post a new answer
export async function PATCH(req: Request) {
	try {
		const { query_id, answer } = await req.json();

		if (!answer.trim()) {
			return NextResponse.json(
				{ success: false, error: 'Answer text is required.' },
				{ status: 400 }
			);
		}

		const newAnswer = {
			query_id,
			name: 'Professor',
			department: 'CS',
			answer,
			timestamp: new Date().toISOString(),
		};

		const { error } = await supabase.from('answers').insert([newAnswer]);
		if (error) throw error;

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 }
		);
	}
}
