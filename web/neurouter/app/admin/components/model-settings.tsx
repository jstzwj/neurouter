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
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Plus, Search } from "lucide-react"

export function ModelSettings() {
  const [models, setModels] = useState([
    {
      id: 1,
      name: "GPT-4o",
      provider: "OpenAI",
      type: "chat",
      contextLength: 128000,
      enabled: true,
      inputPrice: 10.0,
      outputPrice: 30.0,
    },
    {
      id: 2,
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      type: "chat",
      contextLength: 200000,
      enabled: true,
      inputPrice: 3.0,
      outputPrice: 15.0,
    },
    {
      id: 3,
      name: "Gemini 1.5 Pro",
      provider: "Google",
      type: "chat",
      contextLength: 1000000,
      enabled: false,
      inputPrice: 3.5,
      outputPrice: 10.0,
    },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>模型管理</CardTitle>
          <CardDescription>管理系统支持的AI模型</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索模型..." className="pl-8" />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  添加模型
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>添加AI模型</DialogTitle>
                  <DialogDescription>添加新的AI模型到系统中</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="model-name">模型名称</Label>
                      <Input id="model-name" placeholder="例如：GPT-4o" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model-provider">提供商</Label>
                      <Select>
                        <SelectTrigger id="model-provider">
                          <SelectValue placeholder="选择提供商" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="openai">OpenAI</SelectItem>
                          <SelectItem value="anthropic">Anthropic</SelectItem>
                          <SelectItem value="google">Google AI</SelectItem>
                          <SelectItem value="mistral">Mistral AI</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="model-type">模型类型</Label>
                      <Select>
                        <SelectTrigger id="model-type">
                          <SelectValue placeholder="选择模型类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chat">聊天模型</SelectItem>
                          <SelectItem value="embedding">嵌入模型</SelectItem>
                          <SelectItem value="image">图像模型</SelectItem>
                          <SelectItem value="audio">音频模型</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="context-length">上下文长度</Label>
                      <Input id="context-length" type="number" placeholder="例如：128000" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="input-price">输入价格 (每百万token)</Label>
                      <Input id="input-price" type="number" step="0.01" placeholder="例如：10.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="output-price">输出价格 (每百万token)</Label>
                      <Input id="output-price" type="number" step="0.01" placeholder="例如：30.00" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model-description">描述</Label>
                    <Textarea id="model-description" placeholder="模型的简要描述" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="model-enabled" defaultChecked />
                    <Label htmlFor="model-enabled">启用</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button>添加模型</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>提供商</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>上下文长度</TableHead>
                <TableHead>输入价格</TableHead>
                <TableHead>输出价格</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((model) => (
                <TableRow key={model.id}>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>{model.provider}</TableCell>
                  <TableCell>{model.type}</TableCell>
                  <TableCell>{model.contextLength.toLocaleString()}</TableCell>
                  <TableCell>${model.inputPrice.toFixed(2)}</TableCell>
                  <TableCell>${model.outputPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch checked={model.enabled} />
                      <span>{model.enabled ? "启用" : "禁用"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        编辑
                      </Button>
                      <Button variant="outline" size="sm">
                        查看详情
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
