type Props = {
  children?: React.ReactNode
}

export default function Layout ({
  children
}: Props) {
  return (
    <>
      {/* <Header /> */}
      <main className='bg-slate-800 flex place-content-center overflow-x-hidden h-screen'>
        <div className='container py-4 px-4 flex justify-center flex-col gap-2'>
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}