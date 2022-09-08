import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import Layout from '~/components/Layout'
import { getLinks } from '~/models/link.server'
import type { Link as LinkType } from '~/models/link.server'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { getFolders } from '~/models/folder.server'
import BackToHome from '~/components/BackToHome'

type FolderWihtLinks = {
  id: string
  id_user: string
  name: string
  links: LinkType[]
}

type LoaderData = {
  linksForFolder: Awaited<FolderWihtLinks[]>
}

export const loader: LoaderFunction = async ({ request }) => {
  const id_user = request.url.split('/').pop()

  if (typeof id_user !== 'string' || id_user.length === 0) {
    return json(
      { errors: { description: 'id_user is required' } },
      { status: 400 }
    );
  }

  const links = await getLinks()
  const folders = await getFolders({ id_user })

  const linksForFolder = folders.map(folder => {
    const linksForFolder = links.filter(link => link.id_folder === folder.id)
    return { ...folder, links: linksForFolder }
  })

  return  json<LoaderData>({ linksForFolder })
}

export default function ListOfLinkPost() {
  const { linksForFolder } = useLoaderData() as LoaderData

  if (linksForFolder.length === 0) {
    return (
      <Layout>
        <section className='flex items-center justify-center py-8'>
          <Link to='/'>
            <div className='flex items-center justify-center py-3 px-4 mt-6 space-x-4 w-full max-w-[350px] rounded-lg divide-x shadow text-gray-400 divide-gray-700 space-x bg-gray-900'>
              ⬅
              <div className='pl-4 text-sm font-normal'>There haven't link so far. Create folder</div>
              <BackToHome />
            </div>
          </Link>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className='flex justify-between flex-col-reverse py-8 md:flex-row gap-8'>

       <BackToHome />

        <div className='max-w-xl w-full px-4 py-2'>
          <h1 className='flex items-center mb-4 justify-center text-white font-medium text-2xl'>List of links</h1>

          {linksForFolder.map(({id, name, links}) => (
            <Menu key={id} as="div" className="relative mb-3 inline-block text-center w-full">
              <div>
                <Menu.Button className="inline-flex gap-2 w-full justify-center items-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30">
                  <svg viewBox="0 0 490 490" fill='#fff' width={20} height={20}><path d="M410.3 447.2H0l79.7-289.3H490z"/><path d="M62.2 134.9h348.1V90.6h-205l-20.6-47.8H0v318.1z"/></svg>
                  {name}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-[100] mt-2 w-full max-h-80 overflow-auto py-2 divide-y bg-slate-700 divide-gray-100 rounded-md shadow-lg">
                  <div className="px-1">
                    {links.map(({ id, link, description, read }) => (    
                      <Menu.Item key={id}>
                        <div className='flex items-center py-1.5 px-2 mt-2 space-x-2 w-full rounded-lg divide-x shadow text-gray-400 divide-gray-700 space-x bg-gray-900'>
                          <p>
                            {read ? '✅' : '❌'} 
                          </p>
                          <a 
                            className='hover:text-white w-[150px] px-1 font-medium text-left text-white/50 truncate' 
                            href={link} 
                            target='_blank' 
                            rel='nofollow noreferrer'
                          >
                            {link}
                          </a>
                          <div className='pl-4 text-sm font-normal truncate'>{description}</div>
                        </div>
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ))}

        </div>

        <Outlet />
        
      </section>
    </Layout>
  )
}