"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useI18n } from "@/components/i18n-provider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Info, Clock, Activity, Server, Code } from "lucide-react"
import { modelData } from "./data"
import { ModelHeader } from "./components/model-header"
import { OverviewTab } from "./components/overview-tab"
import { ProvidersTab } from "./components/providers-tab"
import { AppsTab } from "./components/apps-tab"
import { ActivityTab } from "./components/activity-tab"
import { UptimeTab } from "./components/uptime-tab"
import { ApiTab } from "./components/api-tab"
import type { ModelData } from "./types"

export default function ModelDetailPage() {
  const { id } = useParams()
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState("overview")
  const [model, setModel] = useState<ModelData | null>(null)

  useEffect(() => {
    // 在实际应用中，这里会从API获取模型数据
    if (typeof id === "string" && modelData[id as keyof typeof modelData]) {
      setModel(modelData[id as keyof typeof modelData])
    }
  }, [id])

  if (!model) {
    return (
      <div className="container py-8 flex items-center justify-center">
        <p>模型未找到</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* 模型标题和基本信息 */}
      <ModelHeader model={model} />

      {/* 标签页导航 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 border-b w-full rounded-none justify-start h-auto p-0">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Overview
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="providers"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
          >
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Providers
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="apps"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h.01" />
                <path d="M12 7h.01" />
                <path d="M17 7h.01" />
                <path d="M7 12h.01" />
                <path d="M12 12h.01" />
                <path d="M17 12h.01" />
                <path d="M7 17h.01" />
                <path d="M12 17h.01" />
                <path d="M17 17h.01" />
              </svg>
              Apps
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
          >
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="uptime"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Uptime
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="api"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2 px-4"
          >
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              API
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab model={model} />
        </TabsContent>

        <TabsContent value="providers">
          <ProvidersTab model={model} />
        </TabsContent>

        <TabsContent value="apps">
          <AppsTab />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityTab model={model} />
        </TabsContent>

        <TabsContent value="uptime">
          <UptimeTab />
        </TabsContent>

        <TabsContent value="api">
          <ApiTab model={model} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
