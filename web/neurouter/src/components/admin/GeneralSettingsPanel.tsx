"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Switch } from "../../components/ui/switch"
import { Button } from "../../components/ui/button"
import { useToast } from "../../hooks/use-toast"

export default function GeneralSettingsPanel() {
    const { toast } = useToast()
    const [siteName, setSiteName] = useState("NeuroRouter")
    const [siteDescription, setSiteDescription] = useState("统一大模型 API 转发平台")
    const [adminEmail, setAdminEmail] = useState("admin@example.com")
    const [maintenanceMode, setMaintenanceMode] = useState(false)
    const [allowRegistration, setAllowRegistration] = useState(true)

    const handleSaveSettings = () => {
        // In a real app, we would save the settings to the server
        toast({
            title: "Settings saved",
            description: "Your settings have been saved successfully.",
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>基本设置</CardTitle>
                <CardDescription>配置系统的基本参数和行为</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="site-name">站点名称</Label>
                        <Input id="site-name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="site-description">站点描述</Label>
                        <Input id="site-description" value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="admin-email">管理员邮箱</Label>
                        <Input id="admin-email" type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <Label>维护模式</Label>
                                <p className="text-sm text-muted-foreground">启用后，只有管理员可以访问站点</p>
                            </div>
                            <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <Label>允许注册</Label>
                                <p className="text-sm text-muted-foreground">允许新用户注册账号</p>
                            </div>
                            <Switch checked={allowRegistration} onCheckedChange={setAllowRegistration} />
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSaveSettings}>保存设置</Button>
            </CardFooter>
        </Card>
    )
}
