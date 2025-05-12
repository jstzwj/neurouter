"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Switch } from "../components/ui/switch"
import { ExternalLink, RefreshCw, Info, ChevronLeft, ChevronRight, Settings } from "lucide-react"

interface Transaction {
    id: string
    date: string
    amount: string
    daysAgo: number
}

export default function CreditsPage() {
    const { t } = useTranslation()
    const [useCrypto, setUseCrypto] = useState(false)
    const [autoTopUp, setAutoTopUp] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    // Mock transactions data
    const transactions: Transaction[] = [
        {
            id: "tx-001",
            date: "2025-04-30",
            amount: "$10",
            daysAgo: 11,
        },
    ]

    return (
        <div className="container mx-auto py-8">
            <div className="flex gap-8">
                {/* Left Sidebar */}
                <div className="w-48 shrink-0">
                    <nav className="space-y-1">
                        <div className="text-lg font-medium mb-4">Settings</div>
                        <div className="space-y-1">
                            <a href="/settings/credits" className="block py-2 text-primary font-medium">
                                Credits
                            </a>
                            <a href="/settings/api-keys" className="block py-2 text-muted-foreground hover:text-foreground">
                                API Keys
                            </a>
                            <a href="/settings/provisioning-keys" className="block py-2 text-muted-foreground hover:text-foreground">
                                Provisioning Keys
                            </a>
                            <a href="/settings/integrations" className="block py-2 text-muted-foreground hover:text-foreground">
                                Integrations
                            </a>
                            <a href="/settings/privacy" className="block py-2 text-muted-foreground hover:text-foreground">
                                Privacy
                            </a>
                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">Credits</h1>
                        <Button variant="ghost" size="icon">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>

                    <Card className="mb-6 bg-muted/30">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="text-3xl font-bold">$ 9.96</div>
                                <Button variant="ghost" size="icon">
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Buy Credits */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-medium">Buy Credits</h2>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">Use crypto</span>
                                        <Switch checked={useCrypto} onCheckedChange={setUseCrypto} />
                                    </div>
                                </div>

                                <Button className="w-full mb-4">Add Credits</Button>

                                <div className="flex justify-between text-sm">
                                    <a href="/usage" className="text-primary flex items-center gap-1 hover:underline">
                                        View Usage
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                    <a href="/billing" className="text-primary flex items-center gap-1 hover:underline">
                                        Manage Billing
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Auto Top-Up */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-medium">Auto Top-Up</h2>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Settings className="h-4 w-4" />
                                        </Button>
                                        <span className="text-sm">Manage</span>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    Automatically purchase credits when your balance is below a certain threshold. Your most recent
                                    payment method will be used.
                                </p>

                                <div className="mt-4">
                                    <Switch checked={autoTopUp} onCheckedChange={setAutoTopUp} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Transactions */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-medium mb-4">Recent Transactions</h2>

                            <div className="border-t">
                                {transactions.map((transaction) => (
                                    <div key={transaction.id} className="py-4 flex items-center justify-between border-b">
                                        <div className="text-sm text-muted-foreground">{transaction.daysAgo} days ago</div>
                                        <div className="font-medium">{transaction.amount}</div>
                                        <a
                                            href={`/invoice/${transaction.id}`}
                                            className="text-primary flex items-center gap-1 text-sm hover:underline"
                                        >
                                            View Invoice
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-6">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm mx-2">{currentPage}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        disabled={transactions.length < 10}
                                        onClick={() => setCurrentPage((prev) => prev + 1)}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
