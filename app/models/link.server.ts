import { supabase } from 'lib/supabaseClient'

export type Link = {
  link: string,
  description: string,
  read: boolean,
}

export async function createLink({ link, description }: { link: string; description: string }) {
  const { data: linkData } = await supabase.from('links').insert({
    link,
    description,
  })

  console.log(linkData)

  if (linkData) return []

  return linkData
}

export async function getLinks() {
  const { data: links } = await supabase
    .from('links')
    .select('*')

  return links as Link[]
}