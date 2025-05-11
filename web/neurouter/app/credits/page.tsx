"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RefreshCw, ExternalLink, CreditCard, Bitcoin, DollarSign, QrCode, Key } from "lucide-react"
import Link from "next/link"

export default function CreditsPage() {
  const [balance, setBalance] = useState(10.0)
  const [useCrypto, setUseCrypto] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState("10")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("creditcard")
  const [activationCode, setActivationCode] = useState("")
  const [isAddCreditsOpen, setIsAddCreditsOpen] = useState(false)
  const [isAutoTopUpOpen, setIsAutoTopUpOpen] = useState(false)
  const [autoTopUpThreshold, setAutoTopUpThreshold] = useState("5")
  const [autoTopUpAmount, setAutoTopUpAmount] = useState("20")

  const transactions = [
    { id: 1, date: "9 days ago", amount: 10, status: "completed" },
    { id: 2, date: "24 days ago", amount: 20, status: "completed" },
    { id: 3, date: "45 days ago", amount: 5, status: "completed" },
  ]

  const predefinedAmounts = [
    { value: "5", label: "$5" },
    { value: "10", label: "$10" },
    { value: "20", label: "$20" },
    { value: "50", label: "$50" },
    { value: "100", label: "$100" },
    { value: "custom", label: "Custom" },
  ]

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Credits</h1>
        <Button variant="ghost" size="icon">
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Balance Card */}
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-baseline">
                <span className="text-2xl mr-2">$</span>
                <span className="text-4xl font-bold">{balance.toFixed(2)}</span>
              </div>
              <Button variant="ghost" size="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </Button>
            </CardContent>
          </Card>

          {/* Buy Credits Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Buy Credits</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Use crypto</span>
                  <Switch checked={useCrypto} onCheckedChange={setUseCrypto} />
                </div>
              </div>

              <Dialog open={isAddCreditsOpen} onOpenChange={setIsAddCreditsOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    Add Credits
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add Credits</DialogTitle>
                    <DialogDescription>Select an amount to add to your account balance.</DialogDescription>
                  </DialogHeader>

                  <div className="py-4 space-y-6">
                    <div className="grid grid-cols-3 gap-2">
                      {predefinedAmounts.map((amount) => (
                        <Button
                          key={amount.value}
                          variant={selectedAmount === amount.value ? "default" : "outline"}
                          onClick={() => setSelectedAmount(amount.value)}
                        >
                          {amount.label}
                        </Button>
                      ))}
                    </div>

                    {selectedAmount === "custom" && (
                      <div className="space-y-2">
                        <Label htmlFor="custom-amount">Custom amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                          <Input
                            id="custom-amount"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="pl-8"
                            placeholder="Enter amount"
                          />
                        </div>
                      </div>
                    )}

                    <Tabs defaultValue="creditcard" onValueChange={setPaymentMethod}>
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="creditcard">Credit Card</TabsTrigger>
                        <TabsTrigger value="crypto">Crypto</TabsTrigger>
                        <TabsTrigger value="other">Other</TabsTrigger>
                      </TabsList>

                      <TabsContent value="creditcard" className="space-y-4">
                        <div className="flex items-center justify-center p-6 border rounded-md">
                          <CreditCard className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                          You'll be redirected to Stripe to complete your purchase.
                        </p>
                      </TabsContent>

                      <TabsContent value="crypto" className="space-y-4">
                        <div className="flex items-center justify-center p-6 border rounded-md">
                          <Bitcoin className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                          You'll be redirected to our crypto payment processor.
                        </p>
                      </TabsContent>

                      <TabsContent value="other" className="space-y-4">
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            variant="outline"
                            className="flex flex-col items-center justify-center h-24"
                            onClick={() => setPaymentMethod("wechat")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-8 w-8 mb-2"
                            >
                              <path d="M10 15a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                              <path d="M2 8a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" />
                              <path d="M14 15a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                              <path d="M6 15a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                              <path d="M18 15a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                            </svg>
                            <span className="text-xs">WeChat Pay</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="flex flex-col items-center justify-center h-24"
                            onClick={() => setPaymentMethod("alipay")}
                          >
                            <DollarSign className="h-8 w-8 mb-2" />
                            <span className="text-xs">Alipay</span>
                          </Button>

                          <Button
                            variant="outline"
                            className="flex flex-col items-center justify-center h-24"
                            onClick={() => setPaymentMethod("code")}
                          >
                            <Key className="h-8 w-8 mb-2" />
                            <span className="text-xs">Activation Code</span>
                          </Button>
                        </div>

                        {paymentMethod === "wechat" && (
                          <div className="flex flex-col items-center space-y-2 p-4 border rounded-md">
                            <QrCode className="h-32 w-32" />
                            <p className="text-sm text-center">Scan with WeChat to pay</p>
                          </div>
                        )}

                        {paymentMethod === "alipay" && (
                          <div className="flex flex-col items-center space-y-2 p-4 border rounded-md">
                            <QrCode className="h-32 w-32" />
                            <p className="text-sm text-center">Scan with Alipay to pay</p>
                          </div>
                        )}

                        {paymentMethod === "code" && (
                          <div className="space-y-2 p-4 border rounded-md">
                            <Label htmlFor="activation-code">Enter activation code</Label>
                            <Input
                              id="activation-code"
                              value={activationCode}
                              onChange={(e) => setActivationCode(e.target.value)}
                              placeholder="XXXX-XXXX-XXXX-XXXX"
                            />
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddCreditsOpen(false)}>
                      Cancel
                    </Button>
                    <Button>{paymentMethod === "code" ? "Redeem Code" : "Proceed to Payment"}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="flex justify-between mt-4">
                <Link href="/usage" className="text-sm text-primary flex items-center">
                  View Usage
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
                <Link href="/billing" className="text-sm text-primary flex items-center">
                  Manage Billing
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Auto Top-Up Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Auto Top-Up</h2>
                <Dialog open={isAutoTopUpOpen} onOpenChange={setIsAutoTopUpOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Auto Top-Up Settings</DialogTitle>
                      <DialogDescription>
                        Configure when and how much to automatically add to your balance.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="threshold">When balance falls below</Label>
                        <Select value={autoTopUpThreshold} onValueChange={setAutoTopUpThreshold}>
                          <SelectTrigger id="threshold">
                            <SelectValue placeholder="Select threshold" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">$1.00</SelectItem>
                            <SelectItem value="5">$5.00</SelectItem>
                            <SelectItem value="10">$10.00</SelectItem>
                            <SelectItem value="20">$20.00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="amount">Add credits worth</Label>
                        <Select value={autoTopUpAmount} onValueChange={setAutoTopUpAmount}>
                          <SelectTrigger id="amount">
                            <SelectValue placeholder="Select amount" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">$10.00</SelectItem>
                            <SelectItem value="20">$20.00</SelectItem>
                            <SelectItem value="50">$50.00</SelectItem>
                            <SelectItem value="100">$100.00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Payment method</Label>
                        <div className="flex items-center p-3 border rounded-md">
                          <CreditCard className="h-4 w-4 mr-2" />
                          <span className="text-sm">Visa ending in 4242</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Your default payment method will be used for auto top-ups.
                        </p>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAutoTopUpOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAutoTopUpOpen(false)}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <p className="text-muted-foreground">
                Automatically purchase credits when your balance is below a certain threshold. Your most recent payment
                method will be used.
              </p>
            </CardContent>
          </Card>

          {/* Recent Transactions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {transactions.map((transaction, index) => (
                <div key={transaction.id}>
                  <div className="flex items-center justify-between p-4">
                    <div className="text-muted-foreground">{transaction.date}</div>
                    <div className="flex items-center gap-4">
                      <span>${transaction.amount}</span>
                      <Link href={`/invoice/${transaction.id}`} className="text-primary flex items-center">
                        View Invoice
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                  {index < transactions.length - 1 && <Separator />}
                </div>
              ))}

              <div className="flex items-center justify-center p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" disabled>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </Button>
                  <span className="text-sm">1</span>
                  <Button variant="outline" size="icon" disabled>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
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
