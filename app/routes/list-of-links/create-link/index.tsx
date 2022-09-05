import { ActionFunction, json } from "@remix-run/node"
import { Form } from "@remix-run/react"
import { createLink } from "~/models/link.server"

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
  const id_user = formData.get('id_user')

  if (typeof link !== "string" || link.length === 0) {
    return json<ActionData>(
      { errors: { link: "Link is required" } },
      { status: 400 }
    );
  }

  if (typeof description !== "string" || description.length === 0) {
    return json<ActionData>(
      { errors: { description: "Description is required" } },
      { status: 400 }
    );
  }

  if (typeof id_user !== "string" || id_user.length === 0) {
    return json<ActionData>(
      { errors: { description: "id_user is required" } },
      { status: 400 }
    );
  }

  const linkData = await createLink({ link, description, id_user })

  return json({ linkData }, { status: 201 })
}

export default function NewLinkRoute() {
  const id_user = sessionStorage.getItem('id_user')

  if (!id_user) return 'You are not logged in'

  return (
    <>
      <Form method="post" className='flex justify-center items-center flex-col gap-4 w-1/2'>
        <h2 className="text-white font-bold text-2xl">Add link to list</h2>
        <input className='hidden' name='id_user' value={id_user} />
        <div className="w-full px-6">
          <input 
            type='text'
            name='link'
            className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            placeholder='Link'
            required
          />
        </div>
        <div className="w-full px-6">
          <input 
            type='text'
            name='description'
            className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            placeholder='Description'
            required
          />
        </div>
        <button 
          type="submit" 
          className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >Submit
        </button>
      </Form>
    </>
  )
}