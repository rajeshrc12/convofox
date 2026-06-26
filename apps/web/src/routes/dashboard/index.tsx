import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { Outlet } from "react-router"

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-hidden bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
