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
