import { supabase } from 'lib/supabaseClient'
// import type { User } from 'lib/supabaseClient'

import { useEffect, useState } from 'react'

export type User = {
  id: string,
  avatar: string,
  name: string,
  userName: string,
  email: string
}

type UserGithub = {
  avatar_url: string
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  preferred_username: string
  provider_id: string
  sub: string
  user_name: string
}

export const extractInfoFrom = (rawUser: any): User | null => {
  const userData = rawUser?.identities?.[0]?.identity_data
  console.log(userData)
  if (!userData) return null

	const { id } = rawUser
	const { user_name: userName, name, email } = userData
	const avatar = `https://unavatar.io/github/${userName}`

	return { avatar, id, userName, name, email }
}

export const getUser = () => {
	const [user, setUser] = useState<User | null>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserSup = async () => {
      const rowUser = await supabase.auth.getUser()
      const rawUser = rowUser.data.user
      if (!rawUser) return null
      const dataUserSupabase = rawUser?.identities?.[0]?.identity_data as UserGithub
    
      const { id } = rawUser
      const { user_name: userName, name, email } = dataUserSupabase
      const avatar = `https://unavatar.io/github/${userName}`
    
      const userData = { avatar, id, userName, name, email }
      setUser(userData)
    }
    
    getUserSup()

    const { data: listener } = supabase.auth.onAuthStateChange((even, session) => {
      const newUser = extractInfoFrom(session?.user)
      setUser(newUser)
    })

    if (user || user === null) setLoading(!loading)

    return () => listener?.subscription.unsubscribe()
  }, [])

	return { user, loading }
}

