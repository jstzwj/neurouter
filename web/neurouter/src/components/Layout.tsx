import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Toaster } from "./ui/toaster"
import { useTranslation } from "react-i18next"

export default function Layout() {
  const { i18n } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col bg-background" lang={i18n.language}>
      <Navbar />
      <main className="container mx-auto px-4 py-6 flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
