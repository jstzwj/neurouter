import type { UptimeStatus } from "../utils/mockData"

interface UptimeHistoryProps {
    history: UptimeStatus[]
    height?: number
    gap?: number
    showLabels?: boolean
    className?: string
}

export default function UptimeHistory({
    history,
    height = 8,
    gap = 1,
    showLabels = false,
    className = "",
}: UptimeHistoryProps) {
    if (!history || history.length === 0) {
        return null
    }

    const getStatusColor = (status: UptimeStatus) => {
        switch (status) {
            case "normal":
                return "bg-green-500"
            case "slow":
                return "bg-yellow-500"
            case "down":
                return "bg-red-500"
            default:
                return "bg-gray-300"
        }
    }

    return (
        <div className={className}>
            <div className={`flex h-${height} w-full gap-[${gap}px]`} style={{ gap: `${gap}px` }}>
                {history.map((status, index) => (
                    <div key={index} className={`flex-1 h-full ${getStatusColor(status)}`} title={`Status: ${status}`} />
                ))}
            </div>

            {showLabels && (
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                    <span>Now</span>
                </div>
            )}
        </div>
    )
}
