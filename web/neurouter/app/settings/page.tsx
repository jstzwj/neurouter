"use client"

import type React from "react"

import { useState } from "react"
import { useI18n } from "@/components/i18n-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")

  const [profileForm, setProfileForm] = useState({
    name: "张三",
    email: "zhang@example.com",
    bio: "人工智能爱好者，专注于大语言模型应用开发。",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "个人资料已更新",
      description: "您的个人资料已成功保存",
    })
  }

  const handleLanguageChange = (value: string) => {
    setLocale(value as "zh-CN" | "en-US")
    toast({
      title: "语言已更改",
      description: value === "zh-CN" ? "已切换到中文" : "Switched to English",
    })
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{t("settings")}</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="account">账号设置</TabsTrigger>
          <TabsTrigger value="api">API 设置</TabsTrigger>
          <TabsTrigger value="billing">计费</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleProfileSubmit}>
              <CardHeader>
                <CardTitle>个人资料</CardTitle>
                <CardDescription>管理您的个人信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input id="name" name="name" value={profileForm.name} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">个人简介</Label>
                  <Textarea id="bio" name="bio" value={profileForm.bio} onChange={handleProfileChange} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">保存更改</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>账号设置</CardTitle>
              <CardDescription>管理您的账号偏好设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">双因素认证</p>
                  <p className="text-sm text-muted-foreground">启用双因素认证以提高账号安全性</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">语言</Label>
                <Select value={locale} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择语言" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zh-CN">中文</SelectItem>
                    <SelectItem value="en-US">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">邮件通知</p>
                  <p className="text-sm text-muted-foreground">接收关于账号活动和更新的邮件通知</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">危险区域</CardTitle>
              <CardDescription>这些操作不可撤销，请谨慎操作</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">删除账号</p>
                <p className="text-sm text-muted-foreground mb-2">永久删除您的账号和所有相关数据</p>
                <Button variant="destructive">删除账号</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API 设置</CardTitle>
              <CardDescription>管理您的 API 密钥和使用限制</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>API 密钥</Label>
                <div className="flex space-x-2">
                  <Input value="nr_sk_•••••••••••••••••••••••••••" readOnly />
                  <Button variant="outline">复制</Button>
                  <Button variant="outline">重新生成</Button>
                </div>
                <p className="text-xs text-muted-foreground">请妥善保管您的 API 密钥，不要分享给他人</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate-limit">速率限制 (每分钟请求数)</Label>
                <Select defaultValue="60">
                  <SelectTrigger>
                    <SelectValue placeholder="选择限制" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 请求/分钟</SelectItem>
                    <SelectItem value="60">60 请求/分钟</SelectItem>
                    <SelectItem value="120">120 请求/分钟</SelectItem>
                    <SelectItem value="unlimited">无限制 (企业版)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>API 文档</Label>
                <p className="text-sm">查看我们的 API 文档以了解如何集成 NeuroRouter 到您的应用中</p>
                <Button variant="outline">查看文档</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>计费信息</CardTitle>
              <CardDescription>管理您的订阅和支付方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">当前计划</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold">免费计划</p>
                        <p className="text-sm text-muted-foreground">每月 100,000 tokens 免费额度</p>
                      </div>
                      <Button>升级</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">支付方式</h3>
                <p className="text-sm text-muted-foreground">尚未添加支付方式</p>
                <Button variant="outline" className="mt-2">
                  添加支付方式
                </Button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">账单历史</h3>
                <p className="text-sm text-muted-foreground">尚无账单记录</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
