import { ActionFunction, json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { getFolders } from '~/models/folder.server'
import type { LoaderFunction } from '@remix-run/node'
import Layout from '~/components/Layout'
import createFolder from '~/models/folder.server'
import BackToHome from '~/components/BackToHome'

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
  const nameFolder = formData.get('nameFolder')
  const id_user = request.url.split('/').pop()

  if (typeof nameFolder !== 'string' || nameFolder.length === 0) {
    return json<ActionData>(
      { errors: { description: 'nameFolder is required' } },
      { status: 400 }
    );
  }

  if (typeof id_user !== 'string' || id_user.length === 0) {
    return json<ActionData>(
      { errors: { description: 'id_user is required' } },
      { status: 400 }
    );
  }

  await createFolder({ nameFolder, id_user })

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

export default function NewFolderRoute() {
  const { folders } = useLoaderData() as LoaderData

  return (
    <Layout>
      <section className='flex justify-between flex-col-reverse py-8 md:flex-row gap-8'>
        <BackToHome />

        <div className="relative mb-3 inline-block text-center w-full">
          <h1 className='flex items-center mb-4 justify-center text-white font-medium text-2xl'>List of folders</h1>
          {folders.length === 0
            ? (
              <div className='flex items-center justify-center py-3 px-4 mt-6 space-x-4 w-full rounded-lg divide-x shadow text-gray-400 divide-gray-700 space-x bg-gray-900'>
                ➡
                <div className='pl-4 text-sm font-normal'>There haven't link so far. Create new folder </div>
              </div>
            )
            : (
              folders.map((folder) => (
                <div key={folder.id} className="inline-flex mb-2 w-full justify-center items-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30">
                  <svg className='mr-2' viewBox="0 0 490 490" fill='#fff' width={20} height={20}><path d="M410.3 447.2H0l79.7-289.3H490z"/><path d="M62.2 134.9h348.1V90.6h-205l-20.6-47.8H0v318.1z"/></svg>
                  <h1>{folder.name}</h1>
                </div>
              ))
            )}
        </div>

        <div className='w-full flex flex-col items-center'>
          <h2 className='text-white font-bold text-2xl pb-4'>Create a new folder</h2>
          <Form method='post' className='flex  items-center flex-col gap-4 w-full'>
            <div className='relative z-0 mb-4 w-full px-6'>
              <input 
                type='text'
                name='nameFolder'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer'
                placeholder=' '
                required
              />
              <label className='absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Name folder
              </label>
            </div>
            <button 
              type='submit' 
              className='text-white cursor-default bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
            >Submit
            </button>
          </Form>
        </div>
        
      </section>
    </Layout>
  )
}