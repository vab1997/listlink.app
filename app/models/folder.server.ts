import { supabase } from "lib/supabaseClient"

export type Folder = {
  id: string
  id_user: string,
  name: string,
}

export default async function createFolder({ nameFolder, id_user }: { nameFolder: string, id_user: string }) {
  const { data: folderData } = await supabase.from('folders').insert({
    name: nameFolder,
    id_user
  })

  if (folderData) return []

  return folderData
}

export async function getFolders ({ id_user }: { id_user: string }) {
  const { data: folders } = await supabase
    .from('folders')
    .select('*')
    .eq('id_user', id_user)

  return folders as Folder[]
}
