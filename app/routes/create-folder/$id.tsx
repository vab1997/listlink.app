import type { LoaderFunction } from '@remix-run/node'
import { ActionFunction, json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { getFolders } from '~/models/folder.server'
import createFolder from '~/models/folder.server'
import BackToHome from '~/components/BackToHome'
import Layout from '~/components/Layout'

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

        <div className='relative mb-3 inline-block text-center w-full'>
          <h1 className='flex items-center gap-2 mb-4 justify-center text-white font-medium text-2xl'>
            List of folders
            <svg width="32" height="32" fill="none"><path d="M16.833 10H25c1.149 0 2 .851 2 2v1L14 23.5 2.61 28.23C2.22 27.63 2 26.773 2 26V8.08A2.08 2.08 0 0 1 4.08 6h6.675c.809 0 1.585.32 2.158.89l2.453 2.498c.39.387.918.612 1.467.612Z" fill="#FFB02E"/><path d="M27.911 13H10.886a3.68 3.68 0 0 0-3.463 2.439C2.832 28.604 3.211 27.658 3.095 27.806a.548.548 0 0 1-.453.25.35.35 0 0 1-.182-.054 3.783 3.783 0 0 0 3.585 2h17.952a2.033 2.033 0 0 0 1.939-1.453l3.962-12.835A2.086 2.086 0 0 0 27.911 13Z" fill="#FCD53F"/></svg>
            {/* <img src={folderIcon} className='h-6 inline-block' /> */}
          </h1>
          {folders.length === 0
            ? (
              <div className='flex items-center justify-center py-3 px-4 mt-6 space-x-4 w-full rounded-lg divide-x shadow text-gray-400 divide-gray-700 space-x bg-gray-900'>
                ➡
                <div className='pl-4 text-sm font-normal'>There haven't link so far. Create new folder </div>
              </div>
            )
            : (
              folders.map((folder) => (
                <div key={folder.id} className='inline-flex mb-2 w-full gap-2 justify-center items-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white'>
                  <svg width="24" height="24" fill="none"><path d="m15.385 7.39-2.477-2.475A3.121 3.121 0 0 0 10.698 4H4.126A2.125 2.125 0 0 0 2 6.125V13.5h28v-3.363a2.125 2.125 0 0 0-2.125-2.125H16.887a2.126 2.126 0 0 1-1.502-.621Z" fill="#FFB02E"/><path d="M27.875 30H4.125A2.118 2.118 0 0 1 2 27.888V13.112C2 11.945 2.951 11 4.125 11h23.75c1.174 0 2.125.945 2.125 2.112v14.776A2.118 2.118 0 0 1 27.875 30Z" fill="#FCD53F"/></svg>
                  <h1>{folder.name}</h1>
                </div>
              ))
            )}
        </div>

        <div className='w-full flex flex-col items-center'>
          <h2 className='text-white font-bold text-2xl pb-4'>
            Create a new folder
          </h2>
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
            >Create folder
            </button>
          </Form>
        </div>
        
      </section>
    </Layout>
  )
}