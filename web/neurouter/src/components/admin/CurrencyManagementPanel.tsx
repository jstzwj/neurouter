"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Switch } from "../../components/ui/switch"
import { Button } from "../../components/ui/button"
import { RefreshCw, Plus } from "lucide-react"
import { useToast } from "../../hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog"
import type { Currency } from "../../types/admin"

export default function CurrencyManagementPanel() {
    const { toast } = useToast()
    const [defaultCurrency, setDefaultCurrency] = useState("USD")
    const [isAddCurrencyOpen, setIsAddCurrencyOpen] = useState(false)
    const [isEditCurrencyOpen, setIsEditCurrencyOpen] = useState(false)
    const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null)
    const [newCurrency, setNewCurrency] = useState<Partial<Currency>>({
        name: "",
        code: "",
        symbol: "",
        exchangeRate: 1,
        isDefault: false,
    })

    const [currencies, setCurrencies] = useState<Currency[]>([
        {
            id: "1",
            name: "美元",
            code: "USD",
            symbol: "$",
            exchangeRate: 1,
            isDefault: true,
        },
        {
            id: "2",
            name: "人民币",
            code: "CNY",
            symbol: "¥",
            exchangeRate: 7.2,
            isDefault: false,
        },
        {
            id: "3",
            name: "欧元",
            code: "EUR",
            symbol: "€",
            exchangeRate: 0.92,
            isDefault: false,
        },
        {
            id: "4",
            name: "日元",
            code: "JPY",
            symbol: "¥",
            exchangeRate: 150.2,
            isDefault: false,
        },
    ])

    const handleUpdateExchangeRates = () => {
        toast({
            title: "Exchange rates updated",
            description: "Currency exchange rates have been updated successfully.",
        })
    }

    const handleAddCurrency = () => {
        if (!newCurrency.name || !newCurrency.code || !newCurrency.symbol) {
            toast({
                title: "Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            })
            return
        }

        const newId = (currencies.length + 1).toString()
        const currencyToAdd: Currency = {
            id: newId,
            name: newCurrency.name,
            code: newCurrency.code,
            symbol: newCurrency.symbol,
            exchangeRate: newCurrency.exchangeRate || 1,
            isDefault: newCurrency.isDefault || false,
        }

        // If the new currency is set as default, update other currencies
        let updatedCurrencies = [...currencies]
        if (currencyToAdd.isDefault) {
            updatedCurrencies = updatedCurrencies.map((c) => ({
                ...c,
                isDefault: false,
            }))
            setDefaultCurrency(currencyToAdd.code)
        }

        setCurrencies([...updatedCurrencies, currencyToAdd])
        setNewCurrency({
            name: "",
            code: "",
            symbol: "",
            exchangeRate: 1,
            isDefault: false,
        })
        setIsAddCurrencyOpen(false)

        toast({
            title: "Currency added",
            description: `${currencyToAdd.name} has been added successfully.`,
        })
    }

    const handleEditCurrency = () => {
        if (!editingCurrency) return

        const updatedCurrencies = currencies.map((currency) => {
            if (currency.id === editingCurrency.id) {
                return editingCurrency
            }

            // If the edited currency is set as default, update other currencies
            if (editingCurrency.isDefault && currency.id !== editingCurrency.id) {
                return {
                    ...currency,
                    isDefault: false,
                }
            }

            return currency
        })

        if (editingCurrency.isDefault) {
            setDefaultCurrency(editingCurrency.code)
        }

        setCurrencies(updatedCurrencies)
        setEditingCurrency(null)
        setIsEditCurrencyOpen(false)

        toast({
            title: "Currency updated",
            description: `${editingCurrency.name} has been updated successfully.`,
        })
    }

    const handleDeleteCurrency = (id: string) => {
        const currencyToDelete = currencies.find((c) => c.id === id)
        if (!currencyToDelete) return

        if (currencyToDelete.isDefault) {
            toast({
                title: "Cannot delete default currency",
                description: "Please set another currency as default before deleting this one.",
                variant: "destructive",
            })
            return
        }

        setCurrencies(currencies.filter((currency) => currency.id !== id))

        toast({
            title: "Currency deleted",
            description: `${currencyToDelete.name} has been deleted successfully.`,
        })
    }

    const handleSetDefaultCurrency = (code: string) => {
        setDefaultCurrency(code)

        const updatedCurrencies = currencies.map((currency) => ({
            ...currency,
            isDefault: currency.code === code,
        }))

        setCurrencies(updatedCurrencies)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>货币管理</CardTitle>
                <CardDescription>管理系统支持的货币和汇率</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="flex justify-between items-end">
                        <div className="space-y-2 w-60">
                            <Label htmlFor="default-currency">默认货币</Label>
                            <Select value={defaultCurrency} onValueChange={handleSetDefaultCurrency}>
                                <SelectTrigger id="default-currency">
                                    <SelectValue placeholder="选择默认货币" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencies.map((currency) => (
                                        <SelectItem key={currency.id} value={currency.code}>
                                            {currency.name} ({currency.code})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Dialog open={isAddCurrencyOpen} onOpenChange={setIsAddCurrencyOpen}>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2">
                                    <Plus className="h-4 w-4" />
                                    添加货币
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>添加新货币</DialogTitle>
                                    <DialogDescription>添加新的货币到系统中。请填写以下信息。</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="currency-name">货币名称</Label>
                                        <Input
                                            id="currency-name"
                                            value={newCurrency.name}
                                            onChange={(e) => setNewCurrency({ ...newCurrency, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="currency-code">代码</Label>
                                        <Input
                                            id="currency-code"
                                            value={newCurrency.code}
                                            onChange={(e) => setNewCurrency({ ...newCurrency, code: e.target.value.toUpperCase() })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="currency-symbol">符号</Label>
                                        <Input
                                            id="currency-symbol"
                                            value={newCurrency.symbol}
                                            onChange={(e) => setNewCurrency({ ...newCurrency, symbol: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="exchange-rate">兑换率 (USD)</Label>
                                        <Input
                                            id="exchange-rate"
                                            type="number"
                                            step="0.01"
                                            value={newCurrency.exchangeRate}
                                            onChange={(e) =>
                                                setNewCurrency({ ...newCurrency, exchangeRate: Number.parseFloat(e.target.value) })
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is-default"
                                            checked={newCurrency.isDefault}
                                            onCheckedChange={(checked) => setNewCurrency({ ...newCurrency, isDefault: checked })}
                                        />
                                        <Label htmlFor="is-default">设为默认货币</Label>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsAddCurrencyOpen(false)}>
                                        取消
                                    </Button>
                                    <Button onClick={handleAddCurrency}>添加</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-medium">货币名称</th>
                                    <th className="text-left py-3 px-4 font-medium">代码</th>
                                    <th className="text-left py-3 px-4 font-medium">符号</th>
                                    <th className="text-left py-3 px-4 font-medium">兑换率 (USD)</th>
                                    <th className="text-left py-3 px-4 font-medium">默认</th>
                                    <th className="text-left py-3 px-4 font-medium">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currencies.map((currency) => (
                                    <tr key={currency.id} className="border-b hover:bg-muted/50">
                                        <td className="py-3 px-4">{currency.name}</td>
                                        <td className="py-3 px-4">{currency.code}</td>
                                        <td className="py-3 px-4">{currency.symbol}</td>
                                        <td className="py-3 px-4">{currency.exchangeRate}</td>
                                        <td className="py-3 px-4">
                                            <span className="text-blue-600">{currency.isDefault ? "是" : "否"}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <Dialog
                                                    open={isEditCurrencyOpen && editingCurrency?.id === currency.id}
                                                    onOpenChange={(open) => {
                                                        setIsEditCurrencyOpen(open)
                                                        if (!open) setEditingCurrency(null)
                                                    }}
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                setEditingCurrency(currency)
                                                                setIsEditCurrencyOpen(true)
                                                            }}
                                                        >
                                                            编辑
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>编辑货币</DialogTitle>
                                                            <DialogDescription>修改货币信息。</DialogDescription>
                                                        </DialogHeader>
                                                        {editingCurrency && (
                                                            <div className="space-y-4 py-4">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit-currency-name">货币名称</Label>
                                                                    <Input
                                                                        id="edit-currency-name"
                                                                        value={editingCurrency.name}
                                                                        onChange={(e) => setEditingCurrency({ ...editingCurrency, name: e.target.value })}
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit-currency-code">代码</Label>
                                                                    <Input
                                                                        id="edit-currency-code"
                                                                        value={editingCurrency.code}
                                                                        onChange={(e) =>
                                                                            setEditingCurrency({
                                                                                ...editingCurrency,
                                                                                code: e.target.value.toUpperCase(),
                                                                            })
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit-currency-symbol">符号</Label>
                                                                    <Input
                                                                        id="edit-currency-symbol"
                                                                        value={editingCurrency.symbol}
                                                                        onChange={(e) => setEditingCurrency({ ...editingCurrency, symbol: e.target.value })}
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="edit-exchange-rate">兑换率 (USD)</Label>
                                                                    <Input
                                                                        id="edit-exchange-rate"
                                                                        type="number"
                                                                        step="0.01"
                                                                        value={editingCurrency.exchangeRate}
                                                                        onChange={(e) =>
                                                                            setEditingCurrency({
                                                                                ...editingCurrency,
                                                                                exchangeRate: Number.parseFloat(e.target.value),
                                                                            })
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <Switch
                                                                        id="edit-is-default"
                                                                        checked={editingCurrency.isDefault}
                                                                        onCheckedChange={(checked) =>
                                                                            setEditingCurrency({ ...editingCurrency, isDefault: checked })
                                                                        }
                                                                    />
                                                                    <Label htmlFor="edit-is-default">设为默认货币</Label>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <DialogFooter>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setIsEditCurrencyOpen(false)
                                                                    setEditingCurrency(null)
                                                                }}
                                                            >
                                                                取消
                                                            </Button>
                                                            <Button onClick={handleEditCurrency}>保存</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() => handleDeleteCurrency(currency.id)}
                                                    disabled={currency.isDefault}
                                                >
                                                    删除
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <Button variant="default" className="flex items-center gap-2" onClick={handleUpdateExchangeRates}>
                            <RefreshCw className="h-4 w-4" />
                            更新汇率
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
