import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dfzoassasczyctqkyujq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmem9hc3Nhc2N6eWN0cWt5dWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIwNzU5NzUsImV4cCI6MTk3NzY1MTk3NX0.8gHIE55eFacP_kCppsydtJVZ7Sc88v-f4Dtdgga8c5M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)