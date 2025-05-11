"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { VisitStatistics } from "./components/visit-statistics"
import { LoginStatistics } from "./components/login-statistics"
import { ModelUsageStatistics } from "./components/model-usage-statistics"

export default function SiteStatistics() {
  const [activeTab, setActiveTab] = useState("visits")
  const [date, setDate] = useState({
    from: new Date(2023, 3, 13), // April 13, 2023
    to: new Date(2023, 4, 13), // May 13, 2023
  })

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

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Site Statistics</h1>
          <p className="text-muted-foreground">
            This is the new usage dashboard. You may see some differences as we aggregate metrics to show UI work at the
            L-level logs.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="visits">Visit Statistics</TabsTrigger>
          <TabsTrigger value="logins">Recent Logins</TabsTrigger>
          <TabsTrigger value="usage">Model Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="visits">
          <VisitStatistics date={date} />
        </TabsContent>

        <TabsContent value="logins">
          <LoginStatistics date={date} />
        </TabsContent>

        <TabsContent value="usage">
          <ModelUsageStatistics date={date} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
