import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export function GeneralSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>基本设置</CardTitle>
          <CardDescription>配置系统的基本参数和行为</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="site-name">站点名称</Label>
            <Input id="site-name" defaultValue="NeuroRouter" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="site-description">站点描述</Label>
            <Input id="site-description" defaultValue="统一大模型 API 转发平台" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-email">管理员邮箱</Label>
            <Input id="admin-email" type="email" defaultValue="admin@example.com" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maintenance-mode">维护模式</Label>
              <p className="text-sm text-muted-foreground">启用后，只有管理员可以访问站点</p>
            </div>
            <Switch id="maintenance-mode" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="registration-enabled">允许注册</Label>
              <p className="text-sm text-muted-foreground">允许新用户注册账号</p>
            </div>
            <Switch id="registration-enabled" defaultChecked />
          </div>

          <Button>保存设置</Button>
        </CardContent>
      </Card>
    </div>
  )
}
