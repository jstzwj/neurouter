import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"

interface GenericPanelProps {
    title: string
    description: string
    children?: React.ReactNode
}

export default function GenericPanel({ title, description, children }: GenericPanelProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">{children || <p>Configure settings for {title.toLowerCase()}.</p>}</div>
            </CardContent>
        </Card>
    )
}
