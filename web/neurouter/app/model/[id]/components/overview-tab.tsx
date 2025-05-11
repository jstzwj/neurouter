import { Card, CardContent } from "@/components/ui/card"
import type { ModelData } from "../types"

interface OverviewTabProps {
  model: ModelData
}

export function OverviewTab({ model }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Model Overview</h2>
          <p className="text-muted-foreground">{model.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
