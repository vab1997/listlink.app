import { Link } from "@remix-run/react"
import { loginGithub } from "services/login"
import { useUser } from '~/hooks/useUser'


export default function LoginButton() {
  const { user } = useUser()

  if (user === undefined || user === null) {
    return (
      <>
        <button
          className="inline-flex items-center px-4 py-2 font-bold text-white bg-black rounded hover:bg-slate-500"
          onClick={loginGithub}
        >
          <svg className="w-6 h-6 mr-2" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
          Iniciar sesión
        </button>
      </>
    )
  }
  
	if (user !== null) {
    return (
      <>
        <div className='flex items-center justify-center flex-col gap-4'>
          <img className='rounded-full w-14 h-14' src={user.avatar} alt={user.name} />
          <p className='font-medium text-white'>{user.name}</p>
          <Link
            to='list-of-links/create-link'
            className='text-md font-semibold px-2.5 py-1 rounded bg-blue-200 text-blue-800 hover:bg-blue-300'
            >
            List of links
          </Link>
        </div>
      </>
		)
  }

  return <div/>
  
}