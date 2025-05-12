"use client"

import { useState } from "react"
import { format, parseISO, subDays } from "date-fns"

interface ActivityCalendarProps {
    data: { date: string; count: number }[]
}

export default function ActivityCalendar({ data }: ActivityCalendarProps) {
    const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null)

    // Find the maximum count to determine the intensity scale
    const maxCount = Math.max(...data.map((day) => day.count), 1)

    // Group data by week
    const weeks: { date: string; count: number }[][] = []
    const today = new Date()
    let currentWeek: { date: string; count: number }[] = []

    // Create a map for quick lookup
    const dataMap = new Map(data.map((item) => [item.date, item.count]))

    // Generate the last 52 weeks (364 days) plus remaining days in the current week
    for (let i = 0; i < 371; i++) {
        const date = subDays(today, 370 - i)
        const dateString = format(date, "yyyy-MM-dd")
        const count = dataMap.get(dateString) || 0

        currentWeek.push({ date: dateString, count })

        // Start a new week on Sunday or when we reach the end
        if (date.getDay() === 6 || i === 370) {
            weeks.push(currentWeek)
            currentWeek = []
        }
    }

    // Function to determine the color based on the count
    const getColorClass = (count: number) => {
        if (count === 0) return "bg-muted"

        const intensity = count / maxCount

        if (intensity < 0.25) return "bg-green-100 dark:bg-green-900"
        if (intensity < 0.5) return "bg-green-300 dark:bg-green-700"
        if (intensity < 0.75) return "bg-green-500 dark:bg-green-500"
        return "bg-green-700 dark:bg-green-300"
    }

    return (
        <div className="w-full overflow-x-auto">
            <div className="relative min-w-[800px]">
                {/* Month labels */}
                <div className="flex mb-2 text-xs text-muted-foreground">
                    <div className="w-8"></div> {/* Spacer for day labels */}
                    <div className="flex-1 flex">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, i) => (
                            <div key={month} className="flex-1 text-center">
                                {month}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex">
                    {/* Day of week labels */}
                    <div className="w-8 flex flex-col justify-around text-xs text-muted-foreground">
                        <div>Mon</div>
                        <div>Wed</div>
                        <div>Fri</div>
                    </div>

                    {/* Calendar grid */}
                    <div className="flex-1 flex gap-1">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex-1 flex flex-col gap-1 max-w-[15px]">
                                {week.map((day, dayIndex) => (
                                    <div
                                        key={`${weekIndex}-${dayIndex}`}
                                        className={`aspect-square w-full rounded-sm ${getColorClass(day.count)} cursor-pointer transition-colors`}
                                        onMouseEnter={() => setHoveredDay(day)}
                                        onMouseLeave={() => setHoveredDay(null)}
                                        title={`${format(parseISO(day.date), "MMM d, yyyy")}: ${day.count} calls`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tooltip */}
                {hoveredDay && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-popover text-popover-foreground p-2 rounded shadow-md text-xs">
                        <div className="font-medium">{format(parseISO(hoveredDay.date), "MMMM d, yyyy")}</div>
                        <div>{hoveredDay.count} API calls</div>
                    </div>
                )}

                {/* Legend */}
                <div className="flex items-center justify-end mt-2 text-xs text-muted-foreground">
                    <span className="mr-2">Less</span>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm bg-muted"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-100 dark:bg-green-900"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-700"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500"></div>
                        <div className="w-3 h-3 rounded-sm bg-green-700 dark:bg-green-300"></div>
                    </div>
                    <span className="ml-2">More</span>
                </div>
            </div>
        </div>
    )
}
