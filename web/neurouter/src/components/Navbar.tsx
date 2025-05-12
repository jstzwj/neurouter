"use client"

import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  CreditCard,
  Key,
  Activity,
  Settings,
  LogOut,
  Shield,
  BarChart2,
  User,
} from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu"
import { useTheme } from "./theme-provider"
import LanguageSelector from "./LanguageSelector"
import { Input } from "./ui/input"

export default function Navbar() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"))

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const navItems = [
    { name: t("nav.models"), path: "/models" },
    { name: t("nav.chat"), path: "/chat" },
    { name: t("nav.rankings"), path: "/rankings" },
    { name: t("nav.docs"), path: "/docs" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground">
              <span className="font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-xl">{t("app.name")}</span>
          </Link>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder={t("search.models")} className="w-full pl-8 pr-10 rounded-md border" />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground opacity-100">
            /
          </kbd>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.path ? "text-foreground" : "text-foreground/60"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <LanguageSelector />

          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            <span className="sr-only">{theme === "light" ? "切换到暗色模式" : "切换到亮色模式"}</span>
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings/credits" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Credits</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings/api-keys" className="flex items-center">
                    <Key className="mr-2 h-4 w-4" />
                    <span>Keys</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/activity" className="flex items-center">
                    <Activity className="mr-2 h-4 w-4" />
                    <span>Activity</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link to="/admin" className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/statistics" className="flex items-center">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    <span>Site Statistics</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => {
                    localStorage.removeItem("token")
                    setIsLoggedIn(false)
                    window.location.href = "/login"
                  }}
                  className="flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" size="sm">
              <Link to="/login">{t("nav.login")}</Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === item.path ? "text-foreground" : "text-foreground/60"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
