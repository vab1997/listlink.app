import { Link } from "@remix-run/react"
import { loginGithub } from "services/login"
import { supabase } from "lib/supabaseClient"
import { useUser } from '~/hooks/useUser'


export default function LoginButton() {
  const { user } = useUser()

  if (user) {
    window.sessionStorage.setItem('id_user', JSON.stringify(user.id))
  }

  const logoutGithub = async () => {
    const { error } = await supabase.auth.signOut()
    console.error(error)
    sessionStorage.setItem('id_user', '')
  }

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
          <div className="flex flex-col gap-2 w-full">
            <Link
              to={`create-folder/${user.id}`}
              className='inline-flex justify-center items-center gap-2 text-md text-center font-semibold px-2.5 py-1 rounded bg-blue-200 text-blue-800 hover:bg-blue-300'
            >
              <svg viewBox="0 0 512.001 512.001" fill='#1e40af' width={24} height={24}><path d="M492.971 211.64h-50.443v-63.41c0-10.502-8.514-19.016-19.016-19.016H189.695V63.91c0-10.502-8.514-19.016-19.016-19.016H19.016C8.514 44.894 0 53.408 0 63.91l.001 384.179c0 10.432 8.48 19.017 19.029 19.017l.03-.001h404.453a19.018 19.018 0 0 0 18.115-13.23l69.459-217.435c3.918-12.265-5.256-24.8-18.116-24.8zM38.032 82.926h113.631v46.288H38.032V82.926zm0 84.321 366.464-.001v44.394H88.489a19.02 19.02 0 0 0-18.115 13.229L38.032 326.092V167.247zm371.593 261.826H45.057l57.321-179.403h364.557l-57.31 179.403z"/><path d="M206.005 358.389h30.973v30.973c0 10.502 8.514 19.016 19.016 19.016 10.502 0 19.016-8.514 19.016-19.016v-30.973h30.973c10.502 0 19.016-8.514 19.016-19.016 0-10.503-8.514-19.016-19.016-19.016H275.01v-30.973c0-10.502-8.514-19.016-19.016-19.016-10.502 0-19.016 8.514-19.016 19.016v30.973h-30.973c-10.502 0-19.016 8.514-19.016 19.016 0 10.502 8.514 19.016 19.016 19.016z"/></svg>
              Create new folder
            </Link>
            <Link
              to={`list-of-links/create-link/${user.id}`}
              className='inline-flex justify-center items-center gap-2 text-md text-center font-semibold px-2.5 py-1 rounded bg-blue-200 text-blue-800 hover:bg-blue-300'
            >
              <svg viewBox="0 0 195.085 195.085" fill='#1e40af' width={24} height={24}><path d="m179.617 15.453-.154-.149c-18.689-18.549-48.477-20.463-69.37-4.441-2.091 1.599-3.776 3.053-5.302 4.575a8.154 8.154 0 0 0-.13.133L71.224 49.012a7.498 7.498 0 0 0 .001 10.606 7.497 7.497 0 0 0 10.606-.001l33.561-33.566.104-.105c1.023-1.01 2.205-2.02 3.715-3.174 15.008-11.508 36.411-10.098 49.789 3.281l.134.131c14.652 14.786 14.611 38.742-.124 53.483l-33.559 33.563a7.498 7.498 0 0 0 5.304 12.802 7.478 7.478 0 0 0 5.304-2.197l33.56-33.563c20.622-20.631 20.622-54.195-.002-74.819zM113.23 135.437l-33.541 33.542a9.483 9.483 0 0 0-.196.205 37.648 37.648 0 0 1-12.945 8.333c-13.995 5.418-29.888 2.07-40.481-8.524-14.768-14.784-14.768-38.84 0-53.619L59.624 81.83a7.506 7.506 0 0 0 2.197-5.305v-.013a7.494 7.494 0 0 0-7.5-7.494 7.479 7.479 0 0 0-5.428 2.328l-33.435 33.422c-20.61 20.628-20.612 54.195-.002 74.828 10.095 10.097 23.628 15.479 37.411 15.479a52.87 52.87 0 0 0 19.084-3.566 52.518 52.518 0 0 0 18.326-11.896c.076-.075.15-.153.223-.232l33.337-33.337a7.501 7.501 0 0 0-10.607-10.607z"/><path d="M59.15 135.908a7.476 7.476 0 0 0 5.304 2.197 7.477 7.477 0 0 0 5.303-2.196l66.164-66.161a7.498 7.498 0 0 0 .001-10.606 7.5 7.5 0 0 0-10.606-.001l-66.164 66.161a7.497 7.497 0 0 0-.002 10.606z"/></svg>
              Create new link
            </Link>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 font-bold text-white bg-black rounded hover:bg-slate-500 w-full"
            onClick={logoutGithub}
          >
            <svg className="w-6 h-6 mr-2" fill='white' viewBox="0 0 24 24" role="none"><path d="M16 13v-2H7V8l-5 4 5 4v-3z" role="none"></path><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z" role="none"></path></svg>
            Cerrar sesión
          </button>
        </div>
      </>
		)
  }

  return <div/>
  
}