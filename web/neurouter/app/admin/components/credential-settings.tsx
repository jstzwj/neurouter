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
import { useState } from "react"
import { Eye, EyeOff, Plus } from "lucide-react"

export function CredentialSettings() {
  const [credentials, setCredentials] = useState([
    { id: 1, name: "OpenAI API Key", provider: "OpenAI", key: "sk-••••••••••••••••••••••••", status: "active" },
    { id: 2, name: "Anthropic API Key", provider: "Anthropic", key: "sk-ant-••••••••••••••••", status: "active" },
    { id: 3, name: "Google AI Key", provider: "Google", key: "AIza••••••••••••••••••••••", status: "inactive" },
  ])

  const [showKey, setShowKey] = useState<Record<number, boolean>>({})

  const toggleShowKey = (id: number) => {
    setShowKey((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Credential管理</CardTitle>
          <CardDescription>管理系统使用的API凭证</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  添加凭证
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>添加API凭证</DialogTitle>
                  <DialogDescription>添加新的API凭证到系统中</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="credential-name">凭证名称</Label>
                    <Input id="credential-name" placeholder="例如：生产环境OpenAI密钥" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider">提供商</Label>
                    <Select>
                      <SelectTrigger id="provider">
                        <SelectValue placeholder="选择提供商" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="google">Google AI</SelectItem>
                        <SelectItem value="mistral">Mistral AI</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API密钥</Label>
                    <Input id="api-key" type="password" placeholder="输入API密钥" />
                  </div>
                </div>
                <DialogFooter>
                  <Button>添加凭证</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>提供商</TableHead>
                <TableHead>密钥</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {credentials.map((credential) => (
                <TableRow key={credential.id}>
                  <TableCell>{credential.name}</TableCell>
                  <TableCell>{credential.provider}</TableCell>
                  <TableCell className="font-mono">
                    <div className="flex items-center">
                      {showKey[credential.id] ? "sk-actual-key-would-be-shown-here-in-full" : credential.key}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 h-6 w-6"
                        onClick={() => toggleShowKey(credential.id)}
                      >
                        {showKey[credential.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        credential.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {credential.status === "active" ? "活跃" : "停用"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        测试
                      </Button>
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
