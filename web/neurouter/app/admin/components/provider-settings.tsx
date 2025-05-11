"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Plus } from "lucide-react"

export function ProviderSettings() {
  const [providers, setProviders] = useState([
    { id: 1, name: "OpenAI", baseUrl: "https://api.openai.com", enabled: true, priority: 1 },
    { id: 2, name: "Anthropic", baseUrl: "https://api.anthropic.com", enabled: true, priority: 2 },
    { id: 3, name: "Google AI", baseUrl: "https://generativelanguage.googleapis.com", enabled: false, priority: 3 },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Provider管理</CardTitle>
          <CardDescription>管理系统支持的AI提供商</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  添加提供商
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>添加AI提供商</DialogTitle>
                  <DialogDescription>添加新的AI服务提供商到系统中</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="provider-name">提供商名称</Label>
                    <Input id="provider-name" placeholder="例如：Mistral AI" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="base-url">基础URL</Label>
                    <Input id="base-url" placeholder="例如：https://api.mistral.ai" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">优先级</Label>
                    <Input id="priority" type="number" min="1" placeholder="数字越小优先级越高" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">描述</Label>
                    <Textarea id="description" placeholder="提供商的简要描述" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="provider-enabled" defaultChecked />
                    <Label htmlFor="provider-enabled">启用</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button>添加提供商</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>基础URL</TableHead>
                <TableHead>优先级</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium">{provider.name}</TableCell>
                  <TableCell>{provider.baseUrl}</TableCell>
                  <TableCell>{provider.priority}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch checked={provider.enabled} />
                      <span>{provider.enabled ? "启用" : "禁用"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        编辑
                      </Button>
                      <Button variant="outline" size="sm">
                        查看模型
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
