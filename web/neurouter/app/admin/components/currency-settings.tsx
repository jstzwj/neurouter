"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

export function CurrencySettings() {
  const [currencies, setCurrencies] = useState([
    { id: 1, name: "美元", code: "USD", symbol: "$", rate: 1.0, isDefault: true },
    { id: 2, name: "人民币", code: "CNY", symbol: "¥", rate: 7.2, isDefault: false },
    { id: 3, name: "欧元", code: "EUR", symbol: "€", rate: 0.92, isDefault: false },
    { id: 4, name: "日元", code: "JPY", symbol: "¥", rate: 150.2, isDefault: false },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>货币管理</CardTitle>
          <CardDescription>管理系统支持的货币和汇率</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <Label>默认货币</Label>
              <Select defaultValue="USD">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="选择默认货币" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.id} value={currency.code}>
                      {currency.name} ({currency.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>添加货币</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>添加新货币</DialogTitle>
                  <DialogDescription>添加新的货币到系统中</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency-name">货币名称</Label>
                      <Input id="currency-name" placeholder="例如：英镑" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency-code">货币代码</Label>
                      <Input id="currency-code" placeholder="例如：GBP" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency-symbol">货币符号</Label>
                      <Input id="currency-symbol" placeholder="例如：£" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exchange-rate">兑换率（相对于美元）</Label>
                      <Input id="exchange-rate" type="number" step="0.01" placeholder="例如：0.78" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button>添加货币</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>货币名称</TableHead>
                <TableHead>代码</TableHead>
                <TableHead>符号</TableHead>
                <TableHead>兑换率（USD）</TableHead>
                <TableHead>默认</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currencies.map((currency) => (
                <TableRow key={currency.id}>
                  <TableCell>{currency.name}</TableCell>
                  <TableCell>{currency.code}</TableCell>
                  <TableCell>{currency.symbol}</TableCell>
                  <TableCell>{currency.rate}</TableCell>
                  <TableCell>{currency.isDefault ? "是" : "否"}</TableCell>
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
        <CardFooter>
          <Button>更新汇率</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
