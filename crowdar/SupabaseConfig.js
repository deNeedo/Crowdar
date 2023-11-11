import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://supabase.crowdar.pl'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)