export type UptimeStatus = "normal" | "slow" | "down"

/**
 * 生成模拟的运行时间历史数据
 * @param reliability 可靠性百分比 (0-100)
 * @param count 数据点数量
 * @returns 运行状态数组
 */
export function generateUptimeHistory(reliability: number, count = 32): UptimeStatus[] {
    const result: UptimeStatus[] = []

    for (let i = 0; i < count; i++) {
        const random = Math.random() * 100

        if (random > reliability) {
            // 出现问题的概率是 (100 - reliability)%
            if (random > reliability + (100 - reliability) / 2) {
                // 一半的问题是宕机
                result.push("down")
            } else {
                // 另一半是缓慢
                result.push("slow")
            }
        } else {
            // 正常运行的概率是 reliability%
            result.push("normal")
        }
    }

    return result
}

/**
 * 根据运行时间历史计算可用性百分比
 * @param history 运行状态数组
 * @returns 格式化的可用性百分比
 */
export function calculateUptimePercentage(history: UptimeStatus[]): string {
    if (!history.length) return "100.00%"

    const normalCount = history.filter((status) => status === "normal").length
    const slowCount = history.filter((status) => status === "slow").length

    // 缓慢状态算作半个正常状态
    const effectiveUptime = normalCount + slowCount * 0.5
    const percentage = (effectiveUptime / history.length) * 100

    return percentage.toFixed(2) + "%"
}

/**
 * Generate mock activity data for the GitHub-style contribution graph
 * @param days Number of days to generate data for
 * @param maxCount Maximum number of activities per day
 * @returns Array of date and count objects
 */
export function generateMockActivityData(days: number, maxCount = 10): { date: string; count: number }[] {
    const result: { date: string; count: number }[] = []
    const today = new Date()

    // Generate a pattern with higher activity on weekdays and less on weekends
    for (let i = 0; i < days; i++) {
        const date = new Date()
        date.setDate(today.getDate() - i)

        // Format date as YYYY-MM-DD
        const dateString = date.toISOString().split("T")[0]

        // Generate a random count with some patterns
        let count = 0

        // Weekend has less activity
        const isWeekend = date.getDay() === 0 || date.getDay() === 6

        if (isWeekend) {
            // 70% chance of no activity on weekends
            if (Math.random() < 0.7) {
                count = 0
            } else {
                count = Math.floor(Math.random() * (maxCount / 3))
            }
        } else {
            // Weekdays have more activity
            // 20% chance of high activity
            if (Math.random() < 0.2) {
                count = Math.floor(Math.random() * maxCount * 0.7) + Math.floor(maxCount * 0.3)
            }
            // 60% chance of medium activity
            else if (Math.random() < 0.8) {
                count = Math.floor(Math.random() * (maxCount / 2)) + 1
            }
            // 20% chance of low/no activity
            else {
                count = Math.floor(Math.random() * 2)
            }
        }

        // Add some streaks of activity
        if (i > 0 && i < days - 7) {
            // If the last 3 days had activity, 80% chance to continue the streak
            const lastThreeDays = result.slice(0, 3)
            const hadActivity = lastThreeDays.every((day) => day.count > 0)

            if (hadActivity && Math.random() < 0.8) {
                count = Math.max(1, count)
            }
        }

        result.push({ date: dateString, count })
    }

    return result
}
