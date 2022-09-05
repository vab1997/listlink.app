import Layout from "~/components/Layout"
import LoginButton from "~/components/LoginButton"

export default function Index() {
  return (
    <Layout>
      <div className='flex justify-center items-center py-8'>
        <LoginButton />
      </div>
    </Layout>
  )
}
