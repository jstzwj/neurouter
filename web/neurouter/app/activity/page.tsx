"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useI18n } from "@/components/i18n-provider"
import { Calendar } from "lucide-react"
import { format } from "date-fns"

export default function ActivityPage() {
  const { t } = useI18n()
  const [dateRange, setDateRange] = useState({ from: "2025-04-11", to: "2025-05-11" })

  // mock统计数据
  const stats = [
    { title: t("Spend"), value: "$0", desc: `${t("Last day")}: $0`, desc2: `${t("Last week")}: $0` },
    { title: t("Tokens"), value: "0", desc: `${t("Last day")}: 0`, desc2: `${t("Last week")}: 0` },
    { title: t("Requests"), value: "0", desc: `${t("Last day")}: 0`, desc2: `${t("Last week")}: 0` },
  ]

  // mock表格数据
  const activityList = [
    {
      timestamp: "May 4, 10:45 PM",
      provider: "Mistral 7B Instruct (free)",
      providerUrl: "#",
      app: "liteLLM",
      appUrl: "#",
      tokens: "14 → 1",
      cost: "$0",
      speed: "1K tps",
      finish: "length",
    },
    {
      timestamp: "May 2, 01:28 AM",
      provider: "GPT - 4.1 Mini",
      providerUrl: "#",
      app: t("Unknown"),
      appUrl: "#",
      tokens: "14 → 173",
      cost: "$0.000282",
      speed: "31.0 tps",
      finish: "stop",
    },
    {
      timestamp: "May 2, 01:22 AM",
      provider: "DeepSeek Prover V2",
      providerUrl: "#",
      app: t("Unknown"),
      appUrl: "#",
      tokens: "4 → 68",
      cost: "$0",
      speed: "78.7 tps",
      finish: "stop",
    },
    {
      timestamp: "May 2, 01:21 AM",
      provider: "DeepSeek Prover V2",
      providerUrl: "#",
      app: t("Unknown"),
      appUrl: "#",
      tokens: "5 → 73",
      cost: "$0.000163",
      speed: "40.1 tps",
      finish: "stop",
    },
    {
      timestamp: "May 2, 01:21 AM",
      provider: "DeepSeek Prover V2",
      providerUrl: "#",
      app: t("Unknown"),
      appUrl: "#",
      tokens: "757 → 44",
      cost: "$0.000626",
      speed: "42.9 tps",
      finish: "stop",
    },
    {
      timestamp: "May 1, 11:29 PM",
      provider: "DeepSeek Prover V2",
      providerUrl: "#",
      app: t("Unknown"),
      appUrl: "#",
      tokens: "10 → 551",
      cost: "$0.00138",
      speed: "66.6 tps",
      finish: "stop",
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{t("Your Activity")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.desc}</div>
              <div className="text-sm text-muted-foreground">{stat.desc2}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Label>{t("From:")}</Label>
          <Input
            type="date"
            value={dateRange.from}
            onChange={e => setDateRange(r => ({ ...r, from: e.target.value }))}
            className="w-36"
          />
          <Label>{t("To:")}</Label>
          <Input
            type="date"
            value={dateRange.to}
            onChange={e => setDateRange(r => ({ ...r, to: e.target.value }))}
            className="w-36"
          />
        </div>
        <Button variant="outline" className="ml-auto">{t("Export")}</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t("Activity Details")}</CardTitle>
          <CardDescription>{t("See how you've been using models on OpenRouter.")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">{t("Timestamp")}</th>
                  <th className="text-left py-3 px-4 font-medium">{t("Provider / Model")}</th>
                  <th className="text-left py-3 px-4 font-medium">{t("App")}</th>
                  <th className="text-left py-3 px-4 font-medium">{t("Tokens")}</th>
                  <th className="text-left py-3 px-4 font-medium">{t("Cost")}</th>
                  <th className="text-left py-3 px-4 font-medium">{t("Speed")}</th>
                  <th className="text-left py-3 px-4 font-medium">{t("Finish")}</th>
                </tr>
              </thead>
              <tbody>
                {activityList.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 whitespace-nowrap">{item.timestamp}</td>
                    <td className="py-3 px-4">
                      <a href={item.providerUrl} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{item.provider}</a>
                    </td>
                    <td className="py-3 px-4">
                      <a href={item.appUrl} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{item.app}</a>
                    </td>
                    <td className="py-3 px-4">{item.tokens}</td>
                    <td className="py-3 px-4">{item.cost}</td>
                    <td className="py-3 px-4">{item.speed}</td>
                    <td className="py-3 px-4">{item.finish}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            {t("Showing")} {activityList.length} {t("of")} {activityList.length} {t("records")}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
