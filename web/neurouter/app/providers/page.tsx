"use client"

import { useState } from "react"
import { useI18n } from "@/components/i18n-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProvidersPage() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState("connected")

  const connectedProviders = [
    { id: "openai", name: "OpenAI", status: "connected", models: ["GPT-4o", "GPT-3.5 Turbo"] },
    { id: "anthropic", name: "Anthropic", status: "connected", models: ["Claude 3.5 Sonnet", "Claude 3 Opus"] },
    { id: "meta", name: "Meta AI", status: "connected", models: ["Llama 3 70B", "Llama 3 8B"] },
  ]

  const availableProviders = [
    { id: "google", name: "Google AI", description: "连接 Google AI 以访问 Gemini 系列模型" },
    { id: "mistral", name: "Mistral AI", description: "连接 Mistral AI 以访问 Mistral Large 和 Mixtral 模型" },
    { id: "cohere", name: "Cohere", description: "连接 Cohere 以访问 Command 系列模型" },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{t("providers")}</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="connected">已连接</TabsTrigger>
          <TabsTrigger value="available">可用提供商</TabsTrigger>
          <TabsTrigger value="settings">设置</TabsTrigger>
        </TabsList>

        <TabsContent value="connected">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedProviders.map((provider) => (
              <Card key={provider.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {provider.name}
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">已连接</span>
                  </CardTitle>
                  <CardDescription>API 密钥已配置</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">可用模型:</p>
                    <ul className="text-sm space-y-1">
                      {provider.models.map((model) => (
                        <li key={model} className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          {model}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">测试连接</Button>
                  <Button variant="destructive">断开连接</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableProviders.map((provider) => (
              <Card key={provider.id}>
                <CardHeader>
                  <CardTitle>{provider.name}</CardTitle>
                  <CardDescription>{provider.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${provider.id}-api-key`}>API 密钥</Label>
                      <Input id={`${provider.id}-api-key`} type="password" placeholder="sk-..." />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">连接</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>提供商设置</CardTitle>
              <CardDescription>配置提供商的全局设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">自动故障转移</p>
                  <p className="text-sm text-muted-foreground">当一个提供商不可用时自动切换到另一个提供商</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">成本优化</p>
                  <p className="text-sm text-muted-foreground">优先使用成本较低的提供商</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">性能优化</p>
                  <p className="text-sm text-muted-foreground">优先使用响应速度更快的提供商</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button>保存设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
