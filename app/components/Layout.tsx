import link from 'public/link.webp'

type Props = {
  children?: React.ReactNode
}

export default function Layout ({
  children
}: Props) {
  return (
    <>
      <main className='bg-slate-800 flex place-content-center overflow-x-hidden'>
        <div className='container py-4 px-4 flex flex-col gap-2 h-screen'>
          <h1 className='text-white flex  justify-center items-center gap-2  text-5xl font-bold mt-12 md:mt-0'>
            Welcome to List Links
            <img src={link} className='h-12 inline-block' />
          </h1>
          {children}
        </div>
      </main>
    </>
  )
}