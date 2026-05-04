import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lvepdvewdkcdhtgwzgll.supabase.co'
const supabaseAnonKey = 'sb_publishable_KJfBIjvd0v3Rjjt2-jIalg_uZ7THbmK'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
