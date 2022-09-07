import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import Layout from '~/components/Layout'
import { getLinks, updateRead } from '~/models/link.server'

type LoaderData = {
  links: Awaited<ReturnType<typeof getLinks>>
}

export const loader: LoaderFunction = async () => {
  const links = await getLinks()
  return  json<LoaderData>({ links })
}

export default function ListOfLinkPost() {
  const { links } = useLoaderData() as LoaderData

  return (
    <Layout>
      <section className='flex justify-between py-8'>

        <div className='max-w-xl w-full px-4 py-2'>
          <h1 className='flex items-center justify-center text-white font-medium text-2xl'>List of links</h1>
          {links.length === 0 && (
            <div className='flex items-center py-3 px-4 mt-6 space-x-4 w-full max-w-[350px] rounded-lg divide-x shadow text-gray-400 divide-gray-700 space-x bg-gray-900'>
              ⬆
              <div className='pl-4 text-sm font-normal'>There haven't link so far. Create link</div>
            </div>
          )}
          {links.map(({ id, link, description, read }) => (
            <div key={id} className='flex items-center py-1.5 px-2 mt-2 space-x-2 w-full rounded-lg divide-x shadow text-gray-400 divide-gray-700 space-x bg-gray-900'>
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
          ))}
        </div>

        <Outlet />
        
      </section>
    </Layout>
  )
}