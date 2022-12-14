import type { LoaderFunction } from '@remix-run/node'
import { ActionFunction, json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { createLink } from '~/models/link.server'
import { getFolders } from '~/models/folder.server'
import toast, { Toaster } from 'react-hot-toast'

type ActionData = {
  errors?: {
    link?: string;
    description?: string;
  }
}

type LoaderData = {
  folders: Awaited<ReturnType<typeof getFolders>>
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const link = formData.get('link')
  const description = formData.get('description')
  const folder = formData.get('folder')
  const id_user = request.url.split('/').pop()

  if (typeof link !== 'string' || link.length === 0) {
    return json<ActionData>(
      { errors: { description: 'Link is required' } },
      { status: 400 }
    );
  }

  if (typeof description !== 'string' || description.length === 0) {
    return json<ActionData>(
      { errors: { description: 'Description is required' } },
      { status: 400 }
    );
  }

  if (typeof id_user !== 'string' || id_user.length === 0) {
    return json<ActionData>(
      { errors: { description: 'id_user is required' } },
      { status: 400 }
    );
  }

  if (typeof folder !== 'string' || folder.length === 0) {
    return json<ActionData>(
      { errors: { description: 'folder is required' } },
      { status: 400 }
    );
  }

  await createLink({ link, description, id_user, id_folder: folder })

  return json({ insert: 'success' })
}

export const loader: LoaderFunction = async ({ request }) => {
  const id_user = request.url.split('/').pop()

  if (typeof id_user !== 'string' || id_user.length === 0) {
    return json<ActionData>(
      { errors: { description: 'id_user is required' } },
      { status: 400 }
    );
  }

  const folders = await getFolders({ id_user })
  return  json<LoaderData>({ folders })
}

export default function NewLinkRoute() {
  const { folders } = useLoaderData() as LoaderData

  return (
    <>
       {/* <Toaster
        position='bottom-right'
        reverseOrder={false}
      /> */}
      <div className='w-full flex flex-col items-center'>
        <h2 className='text-white font-bold text-2xl pb-4'>Add link to list</h2>
        <Form method='post' className='flex  items-center flex-col gap-4 w-full'>
          <div className='relative z-0 mb-4 w-full px-6'>
            <input 
              type='text'
              name='link'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer'
              placeholder=' '
              required
            />
            <label className='absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>URL</label>
          </div>
          <div className='relative z-0 mb-4 w-full px-6'>
            <input 
              type='text'
              name='description'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer'
              placeholder=' '
              required
            />
            <label className='absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Description</label>
          </div>
          <div className='relative z-0 mb-4 w-full px-6'>
            <label className='sr-only'>Underline select</label>
            <select 
              name='folder'
              defaultValue={folders[0].id}
              className='block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-gray-400 border-gray-600 focus:outline-none peer'
            >
              {folders.map(({id, name}) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>
          <button 
            type='submit' 
            className='text-white cursor-default bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
          >Create link
          </button>
        </Form>
      </div>
    </>
  )
}