"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Printer } from "lucide-react"
import Link from "next/link"

export default function InvoicePage() {
  const { id } = useParams()

  // Mock invoice data - in a real app, this would be fetched from an API
  const invoice = {
    id,
    number: `INV-${id}${String(Date.now()).slice(-4)}`,
    date: "May 1, 2023",
    amount: 10.0,
    status: "Paid",
    items: [{ description: "Credits", quantity: 1, unitPrice: 10.0, total: 10.0 }],
    subtotal: 10.0,
    tax: 0.0,
    total: 10.0,
    paymentMethod: "Visa ending in 4242",
  }

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

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">Invoice</h1>
          <p className="text-muted-foreground">#{invoice.number}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Date</h3>
              <p className="text-muted-foreground">{invoice.date}</p>
            </div>
            <div>
              <h3 className="font-medium">Status</h3>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {invoice.status}
              </div>
            </div>
            <div>
              <h3 className="font-medium">Payment Method</h3>
              <p className="text-muted-foreground">{invoice.paymentMethod}</p>
            </div>
            <div>
              <h3 className="font-medium">Amount</h3>
              <p className="text-muted-foreground">${invoice.amount.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Description</th>
                  <th className="text-right py-3 px-4 font-medium">Quantity</th>
                  <th className="text-right py-3 px-4 font-medium">Unit Price</th>
                  <th className="text-right py-3 px-4 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{item.description}</td>
                    <td className="py-3 px-4 text-right">{item.quantity}</td>
                    <td className="py-3 px-4 text-right">${item.unitPrice.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-end">
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${invoice.tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
