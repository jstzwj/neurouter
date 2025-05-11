"use client"

import { useState } from "react"
import { useI18n } from "@/components/i18n-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Database, Plus } from "lucide-react"

export default function DatasetsPage() {
  const { t } = useI18n()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const datasets = [
    {
      id: 1,
      name: "客户支持问答",
      description: "常见客户问题及回答",
      records: 1250,
      created: "2023-04-15",
      lastUpdated: "2023-05-10",
    },
    {
      id: 2,
      name: "产品描述",
      description: "各种产品的详细描述",
      records: 450,
      created: "2023-04-20",
      lastUpdated: "2023-05-05",
    },
    {
      id: 3,
      name: "技术文档",
      description: "API 文档和技术指南",
      records: 780,
      created: "2023-04-25",
      lastUpdated: "2023-05-08",
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t("datasets")}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              创建数据集
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>创建新数据集</DialogTitle>
              <DialogDescription>创建一个新的数据集用于训练或微调模型</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">数据集名称</Label>
                <Input id="name" placeholder="输入数据集名称" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">描述</Label>
                <Textarea id="description" placeholder="描述这个数据集的用途" />
              </div>
              <div className="space-y-2">
                <Label>数据来源</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="cursor-pointer hover:border-primary">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Upload className="h-8 w-8 mb-2" />
                      <p className="text-sm font-medium">上传文件</p>
                    </CardContent>
                  </Card>
                  <Card className="cursor-pointer hover:border-primary">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <FileText className="h-8 w-8 mb-2" />
                      <p className="text-sm font-medium">手动输入</p>
                    </CardContent>
                  </Card>
                  <Card className="cursor-pointer hover:border-primary">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <Database className="h-8 w-8 mb-2" />
                      <p className="text-sm font-medium">从数据库导入</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>创建</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>我的数据集</CardTitle>
          <CardDescription>管理您的数据集用于训练、微调或向量检索</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>记录数</TableHead>
                <TableHead>创建日期</TableHead>
                <TableHead>最后更新</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasets.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell className="font-medium">{dataset.name}</TableCell>
                  <TableCell>{dataset.description}</TableCell>
                  <TableCell>{dataset.records}</TableCell>
                  <TableCell>{dataset.created}</TableCell>
                  <TableCell>{dataset.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        查看
                      </Button>
                      <Button variant="ghost" size="sm">
                        编辑
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            显示 {datasets.length} 个数据集中的 {datasets.length} 个
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
