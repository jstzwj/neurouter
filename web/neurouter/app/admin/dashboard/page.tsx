"use client"

import { useState } from "react"
import { useI18n } from "@/components/i18n-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// 导入各个标签页组件
import { GeneralSettings } from "../components/general-settings"
import { CurrencySettings } from "../components/currency-settings"
import { CredentialSettings } from "../components/credential-settings"
import { ProviderSettings } from "../components/provider-settings"
import { InstanceSettings } from "../components/instance-settings"
import { ModelSettings } from "../components/model-settings"
import { UserSettings } from "../components/user-settings"
import { RoleSettings } from "../components/role-settings"
import { ForwardingSettings } from "../components/forwarding-settings"
import { SystemSettings } from "../components/system-settings"
import { SiteSettings } from "../components/site-settings"

export default function AdminDashboard() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-2">
          <TabsTrigger value="general">基本设置</TabsTrigger>
          <TabsTrigger value="currency">货币管理</TabsTrigger>
          <TabsTrigger value="credential">Credential管理</TabsTrigger>
          <TabsTrigger value="provider">Provider管理</TabsTrigger>
          <TabsTrigger value="instance">实例管理</TabsTrigger>
          <TabsTrigger value="model">模型管理</TabsTrigger>
          <TabsTrigger value="user">用户管理</TabsTrigger>
          <TabsTrigger value="role">角色管理</TabsTrigger>
          <TabsTrigger value="forwarding">转发设置</TabsTrigger>
          <TabsTrigger value="system">系统设置</TabsTrigger>
          <TabsTrigger value="site">站点设置</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="currency">
          <CurrencySettings />
        </TabsContent>

        <TabsContent value="credential">
          <CredentialSettings />
        </TabsContent>

        <TabsContent value="provider">
          <ProviderSettings />
        </TabsContent>

        <TabsContent value="instance">
          <InstanceSettings />
        </TabsContent>

        <TabsContent value="model">
          <ModelSettings />
        </TabsContent>

        <TabsContent value="user">
          <UserSettings />
        </TabsContent>

        <TabsContent value="role">
          <RoleSettings />
        </TabsContent>

        <TabsContent value="forwarding">
          <ForwardingSettings />
        </TabsContent>

        <TabsContent value="system">
          <SystemSettings />
        </TabsContent>

        <TabsContent value="site">
          <SiteSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
