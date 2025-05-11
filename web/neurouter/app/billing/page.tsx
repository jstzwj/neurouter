"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("payment-methods")
  const [isAddCardOpen, setIsAddCardOpen] = useState(false)

  // Mock payment methods
  const paymentMethods = [
    { id: 1, type: "visa", last4: "4242", expMonth: 12, expYear: 2024, isDefault: true },
    { id: 2, type: "mastercard", last4: "5555", expMonth: 10, expYear: 2025, isDefault: false },
  ]

  // Mock billing history
  const billingHistory = [
    { id: 1, date: "May 1, 2023", amount: 10.0, status: "Paid", invoice: "INV-12345" },
    { id: 2, date: "Apr 1, 2023", amount: 20.0, status: "Paid", invoice: "INV-12344" },
    { id: 3, date: "Mar 1, 2023", amount: 5.0, status: "Paid", invoice: "INV-12343" },
  ]

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/credits">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Credits
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Billing</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="billing-history">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="payment-methods">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Payment Methods</h2>
              <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogDescription>Add a new credit card or debit card to your account.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name on Card</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddCardOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddCardOpen(false)}>Add Card</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <Card key={method.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="h-10 w-10 mr-4" />
                        <div>
                          <p className="font-medium">
                            {method.type === "visa" ? "Visa" : "Mastercard"} ending in {method.last4}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Expires {method.expMonth}/{method.expYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {method.isDefault ? (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Default</span>
                        ) : (
                          <Button variant="outline" size="sm">
                            Set as Default
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="billing-history">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past transactions and invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-3 px-4">{item.date}</td>
                        <td className="py-3 px-4">${item.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Link href={`/invoice/${item.id}`} className="text-primary hover:underline">
                            {item.invoice}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Showing {billingHistory.length} of {billingHistory.length} transactions
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
