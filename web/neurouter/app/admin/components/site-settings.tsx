import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SiteSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>站点设置</CardTitle>
          <CardDescription>配置网站的外观和行为</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">常规</TabsTrigger>
              <TabsTrigger value="appearance">外观</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="integration">集成</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-title">站点标题</Label>
                <Input id="site-title" defaultValue="NeuroRouter - 统一大模型 API 转发平台" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">站点描述</Label>
                <Textarea id="site-description" defaultValue="一个网站就可以到处调用各种模型" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">联系邮箱</Label>
                <Input id="contact-email" type="email" defaultValue="contact@example.com" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode">维护模式</Label>
                  <p className="text-sm text-muted-foreground">启用后，网站将显示维护页面</p>
                </div>
                <Switch id="maintenance-mode" />
              </div>

              <Button>保存设置</Button>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">默认主题</Label>
                <Select>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="选择主题" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">浅色</SelectItem>
                    <SelectItem value="dark">深色</SelectItem>
                    <SelectItem value="system">跟随系统</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-color">主色调</Label>
                <div className="flex space-x-2">
                  <Input id="primary-color" type="color" defaultValue="#000000" className="w-12 h-10 p-1" />
                  <Input defaultValue="#000000" className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-upload">站点Logo</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 border rounded flex items-center justify-center bg-muted">Logo</div>
                  <Button variant="outline">上传Logo</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="favicon-upload">站点图标</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 border rounded flex items-center justify-center bg-muted">Icon</div>
                  <Button variant="outline">上传图标</Button>
                </div>
              </div>

              <Button>保存设置</Button>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta标题</Label>
                <Input id="meta-title" defaultValue="NeuroRouter - 统一大模型 API 转发平台" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta描述</Label>
                <Textarea id="meta-description" defaultValue="一个网站就可以到处调用各种模型" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Meta关键词</Label>
                <Input id="meta-keywords" defaultValue="AI, API, 大模型, 转发, LLM" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="robots-index">允许搜索引擎索引</Label>
                  <p className="text-sm text-muted-foreground">允许搜索引擎抓取和索引网站内容</p>
                </div>
                <Switch id="robots-index" defaultChecked />
              </div>

              <Button>保存设置</Button>
            </TabsContent>

            <TabsContent value="integration" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google-analytics">Google Analytics ID</Label>
                <Input id="google-analytics" placeholder="例如：G-XXXXXXXXXX" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-tag-manager">Google Tag Manager ID</Label>
                <Input id="google-tag-manager" placeholder="例如：GTM-XXXXXXX" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-js">自定义JavaScript</Label>
                <Textarea id="custom-js" placeholder="添加自定义JavaScript代码" className="font-mono" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-css">自定义CSS</Label>
                <Textarea id="custom-css" placeholder="添加自定义CSS样式" className="font-mono" />
              </div>

              <Button>保存设置</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
