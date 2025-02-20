import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
	throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY
);

const { data, error } = await supabase.auth.signInWithOAuth({
	provider: 'google',
});
if (error) throw new Error(`OAuth setup error: ${error.message}`);
