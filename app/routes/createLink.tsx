import { json, LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import Layout from '~/components/Layout'
import { getLinks } from '~/models/link.server'

type LoaderData = {
  links: Awaited<ReturnType<typeof getLinks>>
}

export const loader: LoaderFunction = async () => {
  const links = await getLinks()
  return  json<LoaderData>({ links })
}

export default function Link() {
  const { links } = useLoaderData() as LoaderData

  return (
    <Layout>
      <h1 className='text-white text-center text-5xl font-bold'>
        Welcome to List Links
        <img src='./link.webp' className='h-12 inline-block' />
      </h1>

      <section className='py-6 flex md:gap-6 items-center justify-between flex-col '>
        
        <Outlet />

        <div className='w-1/2 flex items-center justify-center flex-col'>
          <h2 className='text-white font-bold text-2xl flex items-center justify-center gap-2'>
            List Links
            <img 
              src='./list.webp' 
              alt='list image'
              className='h-12 inline-block' 
            />
          </h2>
            {links.length === 0 && (
              <div className='flex items-center py-3 px-4 mt-6 space-x-4 w-full max-w-[350px] rounded-lg divide-x shadow text-gray-400 divide-gray-700 space-x bg-gray-900'>
                <img 
                  src='./up_arrow.webp' 
                  alt='up arrow image'
                  className='h-12 inline-block' 
                />
                <div className='pl-4 text-sm font-normal'>There haven't link so far. Create link</div>
              </div>
            )}
          <div className='w-full px-4 py-2'>
            {links.map(({ link, description, read }) => (
              <p key={link} className='flex py-1 mx-2 font-medium text-left px-0 text-white/50 truncate'>
                <a 
                  className='hover:text-white px-1 truncate' 
                  href={link} 
                  target='_blank' 
                  rel='nofollow noreferrer'
                >
                  {link}
                </a>
                - {description} -
                {read ? (
                  <img 
                    src='./check.webp' 
                    alt='up arrow image'
                    className='h-7 p-1 inline-block' 
                  />
                ) : (
                  <img 
                    src='./cross.webp' 
                    alt='up arrow image'
                    className='h-6 p-1 inline-block' 
                  />
                )}
              </p>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}