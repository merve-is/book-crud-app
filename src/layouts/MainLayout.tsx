import { Outlet } from "react-router"
import Navbar from "../components/Navbar"

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-emerald-950 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet/>
      </main>
      <footer className="bg-emerald-900 text-center p-4 text-md opacity-90">2026 - Books</footer>
    </div>
  )
}

export default MainLayout