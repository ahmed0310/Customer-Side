import { Outlet } from 'react-router-dom'
import { BottomNav } from '../components/customer/BottomNav'

export function CustomerLayout() {
  return (
    <div className="mx-auto min-h-dvh max-w-[480px] bg-cream-100">
      <main className="pb-24">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
