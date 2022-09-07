import { ActionFunction, json } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { createLink } from '~/models/link.server'

type ActionData = {
  errors?: {
    link?: string;
    description?: string;
  }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const link = formData.get('link')
  const description = formData.get('description')
  const id_user = request.url.split('/').pop()

  if (typeof link !== 'string' || link.length === 0) {
    return json<ActionData>(
      { errors: { link: 'Link is required' } },
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

  const linkData = await createLink({ link, description, id_user })

  return json({ linkData }, { status: 201 })
}

export default function NewLinkRoute() {
  return (
    <>
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
          <button 
            type='submit' 
            className='text-white cursor-default bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center'
          >Submit
          </button>
        </Form>
      </div>
    </>
  )
}