import { extractInfoFrom, supabase } from 'lib/supabaseClient'
import type { User } from 'lib/supabaseClient'

import { useEffect, useState } from 'react'

export const useUser = () => {
	const [user, setUser] = useState<User | null>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const rowUser = supabase.auth.getUser()
    const user = extractInfoFrom(rowUser)
    setUser(user)

    const { data: listener } = supabase.auth.onAuthStateChange((even, session) => {
      const newUser = extractInfoFrom(session?.user)
      setUser(newUser)
    })

    if (user || user === null) setLoading(!loading)

    // return () => listener?.unsubscribe()
  }, [])

	return user
}

