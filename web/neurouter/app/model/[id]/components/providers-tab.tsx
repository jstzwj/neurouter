"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info, ChevronUp, ChevronDown } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { ModelData, Provider } from "../types"
import Link from "next/link"

interface ProvidersTabProps {
  model: ModelData
}

export function ProvidersTab({ model }: ProvidersTabProps) {
  const [sortBy, setSortBy] = useState("latency")
  const [expandedProviders, setExpandedProviders] = useState<Record<string, boolean>>({})

  const toggleProviderExpand = (providerName: string) => {
    setExpandedProviders((prev) => ({
      ...prev,
      [providerName]: !prev[providerName],
    }))
  }

  const renderUptimeIndicator = (uptime: number) => {
    const color = uptime >= 0.98 ? "bg-green-500" : uptime >= 0.95 ? "bg-yellow-500" : "bg-red-500"
    return (
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-6 rounded ${color}`}></div>
        <div className={`w-2 h-6 rounded ${uptime >= 0.9 ? color : "bg-gray-300"}`}></div>
        <div className={`w-2 h-6 rounded ${uptime >= 0.95 ? color : "bg-gray-300"}`}></div>
      </div>
    )
  }

  const renderProviderDetails = (provider: Provider) => {
    if (!expandedProviders[provider.name]) return null

    return (
      <div className="mt-4 pt-4 space-y-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 左侧：数据政策 */}
          <div className="flex-1">
            <h4 className="text-sm font-medium mb-4">Data Policy</h4>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium">Prompt Training</div>
                <div className="text-sm">{provider.details.dataPolicy.promptTraining}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Prompt Logging</div>
                <div className="text-sm">{provider.details.dataPolicy.promptLogging}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Moderation</div>
                <div className="text-sm">{provider.details.dataPolicy.moderation}</div>
              </div>
            </div>
          </div>

          {/* 右侧：支持的参数和图表 */}
          <div className="flex-1">
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-4">Supported parameters</h4>
              <div className="flex flex-wrap gap-2">
                {provider.details.supportedParameters.map((param: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-muted text-sm rounded-md">
                    {param}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium">May 8, 2023 - 1 AM</h4>
                <span className="text-sm text-muted-foreground">N/A</span>
              </div>
              <div className="h-16 w-full bg-muted/30 rounded-md relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-primary rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-1/4 h-full">
                  <div className="flex h-full">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="w-2 h-full bg-green-500 mr-0.5"></div>
                      ))}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground pt-1 px-2 absolute bottom-0 w-full">
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Providers for {model.name}</h2>
        <p className="text-muted-foreground mb-4">
          OpenRouter routes requests to the best providers that are able to handle your prompt size and parameters, with
          fallbacks to maximize uptime.
          <Button variant="link" className="p-0 h-auto text-primary" size="sm">
            <Info className="h-4 w-4 ml-1" />
          </Button>
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latency">Sort by Latency</SelectItem>
            <SelectItem value="throughput">Sort by Throughput</SelectItem>
            <SelectItem value="uptime">Sort by Uptime</SelectItem>
            <SelectItem value="price">Sort by Price</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-medium text-muted-foreground"></th>
              <th className="text-left py-2 px-4 font-medium text-muted-foreground">Context</th>
              <th className="text-left py-2 px-4 font-medium text-muted-foreground">Max Output</th>
              <th className="text-left py-2 px-4 font-medium text-muted-foreground">Input</th>
              <th className="text-left py-2 px-4 font-medium text-muted-foreground">Output</th>
              <th className="text-left py-2 px-4 font-medium text-muted-foreground">Latency</th>
              <th className="text-left py-2 px-4 font-medium text-muted-foreground">Throughput</th>
              <th className="text-left py-2 px-4 font-medium text-muted-foreground">Uptime</th>
              <th className="text-left py-2 px-4 font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {model.providers.map((provider: Provider, index: number) => (
              <React.Fragment key={index}>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/provider/${provider.name.toLowerCase().replace(/\s+/g, "")}`}
                        className="font-medium hover:text-primary"
                      >
                        {provider.name}
                      </Link>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
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
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
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
                          >
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
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
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
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
                          >
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">{provider.context}</td>
                  <td className="py-4 px-4">{provider.maxOutput}</td>
                  <td className="py-4 px-4">
                    <div>{provider.inputPrice}</div>
                    <div className="text-xs text-muted-foreground">{provider.inputPriceRange}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div>{provider.outputPrice}</div>
                    <div className="text-xs text-muted-foreground">{provider.outputPriceRange}</div>
                  </td>
                  <td className="py-4 px-4">{provider.latency}</td>
                  <td className="py-4 px-4">{provider.throughput}</td>
                  <td className="py-4 px-4">{renderUptimeIndicator(provider.uptime)}</td>
                  <td className="py-4 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => toggleProviderExpand(provider.name)}
                    >
                      {expandedProviders[provider.name] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </td>
                </tr>
                {expandedProviders[provider.name] && (
                  <tr>
                    <td colSpan={9} className="px-4 pb-4 border-b">
                      {renderProviderDetails(provider)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Throughput</h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                >
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M9 21H3v-6" />
                  <path d="M3 3l18 18" />
                </svg>
              </Button>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={model.throughputData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  {Object.keys(model.throughputData[0])
                    .filter((key) => key !== "date")
                    .map((key, index) => (
                      <Line
                        key={index}
                        type="monotone"
                        dataKey={key}
                        stroke={index === 0 ? "#4D96FF" : "#6BCB77"}
                        activeDot={{ r: 8 }}
                      />
                    ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Latency</h3>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                >
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M9 21H3v-6" />
                  <path d="M3 3l18 18" />
                </svg>
              </Button>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={model.latencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  {Object.keys(model.latencyData[0])
                    .filter((key) => key !== "date")
                    .map((key, index) => (
                      <Line
                        key={index}
                        type="monotone"
                        dataKey={key}
                        stroke={index === 0 ? "#4D96FF" : "#6BCB77"}
                        activeDot={{ r: 8 }}
                      />
                    ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
