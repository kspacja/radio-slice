import { createClient } from '@supabase/supabase-js';
import { Database } from './model';

export const clientDB = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);
