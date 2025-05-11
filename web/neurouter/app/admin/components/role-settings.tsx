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
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Plus } from "lucide-react"

export function RoleSettings() {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "管理员",
      description: "系统管理员，拥有所有权限",
      userCount: 2,
      permissions: ["all"],
    },
    {
      id: 2,
      name: "用户",
      description: "普通用户，可以使用API",
      userCount: 15,
      permissions: ["api.use", "models.view"],
    },
    {
      id: 3,
      name: "访客",
      description: "访客用户，只能查看",
      userCount: 5,
      permissions: ["models.view"],
    },
  ])

  const permissionGroups = [
    {
      name: "系统",
      permissions: [
        { id: "system.view", name: "查看系统设置" },
        { id: "system.edit", name: "编辑系统设置" },
      ],
    },
    {
      name: "用户",
      permissions: [
        { id: "users.view", name: "查看用户" },
        { id: "users.create", name: "创建用户" },
        { id: "users.edit", name: "编辑用户" },
        { id: "users.delete", name: "删除用户" },
      ],
    },
    {
      name: "API",
      permissions: [
        { id: "api.use", name: "使用API" },
        { id: "api.keys.create", name: "创建API密钥" },
        { id: "api.keys.view", name: "查看API密钥" },
      ],
    },
    {
      name: "模型",
      permissions: [
        { id: "models.view", name: "查看模型" },
        { id: "models.create", name: "创建模型" },
        { id: "models.edit", name: "编辑模型" },
        { id: "models.delete", name: "删除模型" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>角色管理</CardTitle>
          <CardDescription>管理系统角色和权限</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  添加角色
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>添加角色</DialogTitle>
                  <DialogDescription>添加新角色并设置权限</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="role-name">角色名称</Label>
                    <Input id="role-name" placeholder="例如：高级用户" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role-description">描述</Label>
                    <Input id="role-description" placeholder="角色的简要描述" />
                  </div>

                  <div className="space-y-4">
                    <Label>权限</Label>
                    <div className="border rounded-md p-4 space-y-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="all-permissions" />
                        <Label htmlFor="all-permissions" className="font-bold">
                          所有权限
                        </Label>
                      </div>

                      {permissionGroups.map((group, index) => (
                        <div key={index} className="space-y-2">
                          <h4 className="font-medium">{group.name}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {group.permissions.map((permission) => (
                              <div key={permission.id} className="flex items-center space-x-2">
                                <Checkbox id={permission.id} />
                                <Label htmlFor={permission.id}>{permission.name}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button>添加角色</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>角色名称</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>用户数量</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>{role.userCount}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        编辑
                      </Button>
                      <Button variant="outline" size="sm">
                        查看权限
                      </Button>
                      {role.name !== "管理员" && (
                        <Button variant="outline" size="sm" className="text-red-500">
                          删除
                        </Button>
                      )}
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
