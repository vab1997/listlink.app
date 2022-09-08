import { supabase } from 'lib/supabaseClient'

export type Link = {
  id?: string
  link: string,
  description: string,
  read: boolean,
  id_folder: string
}

export async function createLink({ link, description, id_user, id_folder }: { link: string; description: string, id_user: string, id_folder: string }) {
  const { data: linkData } = await supabase.from('links').insert({
    link,
    description,
    id_user,
    id_folder
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

export async function updateRead ({ id, value }: { id: string, value: boolean }) {
  const { data: linkUpdated } = await supabase
  .from('links')
  .update({ read: value })
  .eq('id', id)
  
  return linkUpdated
}