import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

if (!process.env.SUPABASE_DB_URL || !process.env.SUPABASE_KEY) {
	throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
	process.env.SUPABASE_DB_URL,
	process.env.SUPABASE_KEY
);
