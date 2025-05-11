"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import Link from "next/link"
import { useI18n, type Locale } from "./i18n-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, CreditCard, Key, Clock, Settings, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command"
import { ThemeToggle } from "./theme-toggle"
import { Globe } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const { t, locale, setLocale } = useI18n()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 模拟登录状态 - 在实际应用中，这应该从认证服务获取
  useEffect(() => {
    // 检查本地存储中是否有登录令牌
    const token = localStorage.getItem("token")
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = () => {
    // 模拟登录
    localStorage.setItem("token", "mock-jwt-token")
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    // 模拟登出
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    router.push("/")
  }

  const navItems = [
    { href: "/models", label: t("models") },
    { href: "/chat", label: t("chat") },
    { href: "/rankings", label: t("rankings") },
    { href: "/docs", label: t("docs") },
  ]

  const languages = [
    { code: "zh-CN", name: t("chinese") },
    { code: "en-US", name: t("english") },
    { code: "ja-JP", name: t("japanese") },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">NeuroRouter</span>
          </Link>
        </div>

        <div className="relative hidden md:flex w-full max-w-sm items-center">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={`${t("models")}...`} className="pl-8 pr-12" onClick={() => setOpen(true)} readOnly />
          <kbd className="pointer-events-none absolute right-2 top-2.5 flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder={`${t("models")}...`} />
          <CommandList>
            <CommandGroup heading={t("models")}>
              <CommandItem>Claude 3.5 Sonnet</CommandItem>
              <CommandItem>GPT-4o</CommandItem>
              <CommandItem>Llama 3 70B</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        <div className="flex-1 items-center justify-between space-x-2 md:justify-end md:flex">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            {/* 语言切换下拉框 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLocale(lang.code as Locale)}
                    className={locale === lang.code ? "bg-muted" : ""}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 主题切换开关 */}
            <ThemeToggle />

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">用户名</p>
                      <p className="text-sm text-muted-foreground">user@example.com</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/credits" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Credits</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/api-keys" className="flex items-center">
                      <Key className="mr-2 h-4 w-4" />
                      <span>API Keys</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/activity" className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Activity</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0 1.32 4.24 2.5 2.5 0 0 0 1.98 3A2.5 2.5 0 0 0 12 16.5a2.5 2.5 0 0 0 3.96.44 2.5 2.5 0 0 0 1.98-2.99 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-2.99A2.5 2.5 0 0 0 12 4.5Z" />
                        <path d="M12 12v-1.5" />
                      </svg>
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/statistics" className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M3 3v18h18" />
                        <path d="M18 17V9" />
                        <path d="M13 17V5" />
                        <path d="M8 17v-3" />
                      </svg>
                      <span>Site Statistics</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild onClick={handleLogin}>
                  <Link href="/login">{t("login")}</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">{t("register")}</Link>
                </Button>
              </>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                {!isLoggedIn ? (
                  <>
                    <Link href="/login" className="text-muted-foreground transition-colors hover:text-foreground">
                      {t("login")}
                    </Link>
                    <Link href="/register" className="text-muted-foreground transition-colors hover:text-foreground">
                      {t("register")}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/credits" className="text-muted-foreground transition-colors hover:text-foreground">
                      Credits
                    </Link>
                    <Link href="/api-keys" className="text-muted-foreground transition-colors hover:text-foreground">
                      API Keys
                    </Link>
                    <Link href="/activity" className="text-muted-foreground transition-colors hover:text-foreground">
                      Activity
                    </Link>
                    <Link href="/settings" className="text-muted-foreground transition-colors hover:text-foreground">
                      Settings
                    </Link>
                    <Button variant="ghost" onClick={handleLogout} className="justify-start text-red-500 px-0">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </Button>
                  </>
                )}
                <div className="flex items-center gap-2 mt-4">
                  <p className="text-sm text-muted-foreground">{t("language")}:</p>
                  <div className="flex gap-2">
                    {languages.map((lang) => (
                      <Button
                        key={lang.code}
                        variant={locale === lang.code ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setLocale(lang.code as Locale)}
                      >
                        {lang.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <p className="text-sm text-muted-foreground">{t("theme")}:</p>
                  <ThemeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
