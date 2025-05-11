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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Plus } from "lucide-react"

export function ForwardingSettings() {
  const [rules, setRules] = useState([
    {
      id: 1,
      name: "OpenAI转发",
      sourceModel: "gpt-4",
      targetProvider: "OpenAI",
      targetModel: "gpt-4o",
      priority: 1,
      enabled: true,
    },
    {
      id: 2,
      name: "Anthropic备用",
      sourceModel: "gpt-4",
      targetProvider: "Anthropic",
      targetModel: "claude-3-5-sonnet",
      priority: 2,
      enabled: true,
    },
    {
      id: 3,
      name: "Google备用",
      sourceModel: "gpt-4",
      targetProvider: "Google",
      targetModel: "gemini-1.5-pro",
      priority: 3,
      enabled: false,
    },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>转发设置</CardTitle>
          <CardDescription>管理API请求的转发规则</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  添加转发规则
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>添加转发规则</DialogTitle>
                  <DialogDescription>添加新的API请求转发规则</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="rule-name">规则名称</Label>
                    <Input id="rule-name" placeholder="例如：OpenAI主要转发" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="source-model">源模型</Label>
                    <Select>
                      <SelectTrigger id="source-model">
                        <SelectValue placeholder="选择源模型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">gpt-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                        <SelectItem value="claude-3-opus">claude-3-opus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target-provider">目标提供商</Label>
                    <Select>
                      <SelectTrigger id="target-provider">
                        <SelectValue placeholder="选择目标提供商" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="google">Google AI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target-model">目标模型</Label>
                    <Select>
                      <SelectTrigger id="target-model">
                        <SelectValue placeholder="选择目标模型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                        <SelectItem value="claude-3-5-sonnet">Claude 3.5 Sonnet</SelectItem>
                        <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">优先级</Label>
                    <Input id="priority" type="number" min="1" placeholder="数字越小优先级越高" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="rule-enabled" defaultChecked />
                    <Label htmlFor="rule-enabled">启用</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button>添加规则</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>规则名称</TableHead>
                <TableHead>源模型</TableHead>
                <TableHead>目标提供商</TableHead>
                <TableHead>目标模型</TableHead>
                <TableHead>优先级</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.sourceModel}</TableCell>
                  <TableCell>{rule.targetProvider}</TableCell>
                  <TableCell>{rule.targetModel}</TableCell>
                  <TableCell>{rule.priority}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch checked={rule.enabled} />
                      <span>{rule.enabled ? "启用" : "禁用"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        编辑
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
