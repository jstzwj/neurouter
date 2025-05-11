import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export function SystemSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>系统设置</CardTitle>
          <CardDescription>配置系统的核心参数</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">常规</TabsTrigger>
              <TabsTrigger value="security">安全</TabsTrigger>
              <TabsTrigger value="backup">备份</TabsTrigger>
              <TabsTrigger value="logs">日志</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name">系统名称</Label>
                <Input id="system-name" defaultValue="NeuroRouter" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-version">系统版本</Label>
                <Input id="system-version" defaultValue="1.0.0" readOnly />
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-timezone">系统时区</Label>
                <Select>
                  <SelectTrigger id="system-timezone">
                    <SelectValue placeholder="选择时区" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="asia-shanghai">Asia/Shanghai (GMT+8)</SelectItem>
                    <SelectItem value="america-new_york">America/New_York (GMT-5)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button>保存设置</Button>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">强制两因素认证</Label>
                  <p className="text-sm text-muted-foreground">要求所有用户启用两因素认证</p>
                </div>
                <Switch id="two-factor" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="password-policy">强密码策略</Label>
                  <p className="text-sm text-muted-foreground">要求密码包含大小写字母、数字和特殊字符</p>
                </div>
                <Switch id="password-policy" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">会话超时（分钟）</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>

              <Button>保存设置</Button>
            </TabsContent>

            <TabsContent value="backup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">备份频率</Label>
                <Select>
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="选择备份频率" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">每日</SelectItem>
                    <SelectItem value="weekly">每周</SelectItem>
                    <SelectItem value="monthly">每月</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-retention">备份保留天数</Label>
                <Input id="backup-retention" type="number" defaultValue="30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-location">备份位置</Label>
                <Input id="backup-location" defaultValue="/var/backups" />
              </div>

              <div className="flex justify-between">
                <Button variant="outline">立即备份</Button>
                <Button>保存设置</Button>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="log-level">日志级别</Label>
                <Select>
                  <SelectTrigger id="log-level">
                    <SelectValue placeholder="选择日志级别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="log-retention">日志保留天数</Label>
                <Input id="log-retention" type="number" defaultValue="90" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="log-api-calls">记录API调用</Label>
                  <p className="text-sm text-muted-foreground">记录所有API调用的详细信息</p>
                </div>
                <Switch id="log-api-calls" defaultChecked />
              </div>

              <Button>保存设置</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
