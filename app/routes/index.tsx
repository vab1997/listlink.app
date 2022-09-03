import { redirect } from "@remix-run/node"
import { Link } from "@remix-run/react"
import Layout from "~/components/Layout"
import LoginButton from "~/components/LoginButton"
// import useUser from "~/hooks/useUser"
import { loginGithub } from '../../services/login'

export default function Index() {
  // const {user} = useUser()

  return (
    <Layout>
      <h1 className="text-white text-center text-5xl font-bold">
        Welcome to List Links
        <img src='./link.webp' className="h-12 inline-block" />
      </h1>

      <div className='flex justify-center items-center py-8'>
        <LoginButton />
      </div>
    </Layout>
  )
}
