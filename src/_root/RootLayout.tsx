import { Bottombar, LiftSidebar ,Topbar } from '@/components/shared'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Topbar />
      <LiftSidebar />
      
      <section className='flex flex-1 h-full'>
        <Outlet />
        Home
      </section>

      <Bottombar />
    </div>
  )
}

export default RootLayout
