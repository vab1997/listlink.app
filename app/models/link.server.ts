import { supabase } from 'lib/supabaseClient'

export type Link = {
  link: string,
  description: string,
  read: boolean,
}

export async function createLink({ link, description, id_user }: { link: string; description: string, id_user: string }) {
  const { data: linkData } = await supabase.from('links').insert({
    link,
    description,
    id_user
  })

  if (linkData) return []

  return linkData
}

export async function getLinks() {
  const { data: links } = await supabase
    .from('links')
    .select('*')

  return links as Link[]
}