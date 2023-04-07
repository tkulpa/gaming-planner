import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

let client

if(process?.env?.SUPABASE_URL && process?.env?.SUPABASE_KEY) {
  client = createClient<Database>(process?.env?.SUPABASE_URL, process?.env?.SUPABASE_KEY)
} else {
  throw new Error('Error creating supabase client, no ENV configuration (SUPABASE_URL or SUPABASE_KEY)')
}


export const supabase = client