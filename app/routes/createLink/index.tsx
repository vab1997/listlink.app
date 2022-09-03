import { Link } from "@remix-run/react"

export default function AdminIndexRoute() {
  return (
    <p>
      <Link to='new' className='text-md font-semibold px-2.5 py-1 rounded bg-blue-200 text-blue-800 hover:bg-blue-300'>
        Create new Link
      </Link>
    </p>
  )
}