import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dfzoassasczyctqkyujq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmem9hc3Nhc2N6eWN0cWt5dWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjIwNzU5NzUsImV4cCI6MTk3NzY1MTk3NX0.8gHIE55eFacP_kCppsydtJVZ7Sc88v-f4Dtdgga8c5M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type User = {
  id: string,
  avatar: string,
  name: string,
  userName: string,
  email: string
}

export const extractInfoFrom = (rawUser: any): User | null => {
  const userData = rawUser?.identities?.[0]?.identity_data
  if (!userData) return null

	const { id } = rawUser
	const { user_name: userName, name, email } = userData
	const avatar = `https://unavatar.io/github/${userName}`

	return { avatar, id, userName, name, email }
}