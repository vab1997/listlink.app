import { Fragment } from 'react'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import type { LoaderFunction } from '@remix-run/node'

import { getFolders } from '~/models/folder.server'
import type { Link as LinkType } from '~/models/link.server'
import { getLinks } from '~/models/link.server'
import BackToHome from '~/components/BackToHome'
import Layout from '~/components/Layout'
import checkIcon from 'public/check.webp'
import crossIcon from 'public/cross.webp'
import { Menu, Transition } from '@headlessui/react'

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
          <h1 className='flex items-center mb-4 gap-2 justify-center text-white font-medium text-2xl'>
            List of links
            <svg width="32" height="32" fill="none"><path d="M4 7a2 2 0 0 1 2-2h23a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H4a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3Z" fill="#B4ACBC"/><path d="M28 10a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h25.5a1.5 1.5 0 0 1-1.5-1.5V10Z" fill="#F3EEF8"/><path d="M4 11a1 1 0 0 1 1-1h20a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 3.5a.5.5 0 0 1 .5-.5h21a.5.5 0 0 1 0 1h-21a.5.5 0 0 1-.5-.5ZM19.5 17a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Zm-.5 3.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm.5 2.5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Zm-.5 3.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5ZM6 17a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6Z" fill="#998EA4"/></svg>
          </h1>

          {linksForFolder.map(({id, name, links}) => (
            <Menu key={id} as="div" className="relative mb-3 inline-block text-center w-full">
              <div>
                <Menu.Button className="inline-flex gap-2 w-full justify-center items-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30">
                  <svg width="24" height="24" fill="none"><path d="m15.385 7.39-2.477-2.475A3.121 3.121 0 0 0 10.698 4H4.126A2.125 2.125 0 0 0 2 6.125V13.5h28v-3.363a2.125 2.125 0 0 0-2.125-2.125H16.887a2.126 2.126 0 0 1-1.502-.621Z" fill="#FFB02E"/><path d="M27.875 30H4.125A2.118 2.118 0 0 1 2 27.888V13.112C2 11.945 2.951 11 4.125 11h23.75c1.174 0 2.125.945 2.125 2.112v14.776A2.118 2.118 0 0 1 27.875 30Z" fill="#FCD53F"/></svg>
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
                            {read ? (
                              <svg width="30" height="30" fill="none"><path d="M2 6a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6Z" fill="#00D26A"/><path d="M13.242 23c-.383 0-.766-.143-1.059-.43l-5.744-5.642a1.453 1.453 0 0 1 0-2.08 1.517 1.517 0 0 1 2.118 0l4.685 4.601L23.443 9.431a1.517 1.517 0 0 1 2.118 0 1.452 1.452 0 0 1 0 2.08l-11.26 11.058c-.292.288-.676.431-1.059.431Z" fill="#F4F4F4"/></svg>
                            ) : (
                              <svg width="30" height="30" fill="none"><path d="M24.879 2.879A3 3 0 1 1 29.12 7.12l-8.79 8.79a.125.125 0 0 0 0 .177l8.79 8.79a3 3 0 1 1-4.242 4.243l-8.79-8.79a.125.125 0 0 0-.177 0l-8.79 8.79a3 3 0 1 1-4.243-4.242l8.79-8.79a.125.125 0 0 0 0-.177l-8.79-8.79A3 3 0 0 1 7.12 2.878l8.79 8.79a.125.125 0 0 0 .177 0l8.79-8.79Z" fill="#F92F60"/></svg>                            )} 
                          </p>
                          <a 
                            className='hover:text-white w-[150px] px-1 font-medium text-left text-white/50 truncate' 
                            href={link} 
                            target='_blank' 
                            rel='nofollow noreferrer'
                          >
                            {link}
                          </a>
                          <div className='pl-2 text-sm font-normal truncate'>{description}</div>
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