"use client"

import type React from "react"

import { useState } from "react"
import { useI18n } from "@/components/i18n-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login } from "@/utils/api"

export default function LoginPage() {
  const { t } = useI18n()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(formData)
      toast({
        title: "登录成功",
        description: "欢迎回来！",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "登录失败",
        description: "请检查您的邮箱和密码",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("login")}</CardTitle>
          <CardDescription>输入您的账号信息登录 NeuroRouter</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">密码</Label>
                <Link href="/forgot-password" className="text-sm text-primary">
                  忘记密码?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "登录中..." : t("login")}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              还没有账号?{" "}
              <Link href="/register" className="text-primary">
                {t("register")}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
