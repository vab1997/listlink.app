import { supabase } from 'lib/supabaseClient'

export async function loginGithub () {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github'
  })
  console.error(error)
}