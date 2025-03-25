import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

import DashboardShell from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getTransactionById } from "@/lib/data"

export const metadata: Metadata = {
  title: "Transaction Details",
  description: "View detailed transaction information",
}

export default function TransactionDetailsPage({ params }: { params: { id: string } }) {
  const transaction = getTransactionById(params.id)

  if (!transaction) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800"
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
    }
  }

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" asChild className="rounded-full">
              <Link href="/dashboard/transactions">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to transactions</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight gradient-text-accent">Transaction #{transaction.id}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="rounded-full">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" className="rounded-full">
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 shadow-card border-none bg-white dark:bg-slate-900 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500"></div>
            <CardHeader>
              <CardTitle className="text-emerald-600 dark:text-emerald-400">Transaction Details</CardTitle>
              <CardDescription>Complete information about this transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
                    <p className="text-lg font-medium">{transaction.id}</p>
                  </div>
                  <Badge variant="outline" className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Items</h3>
                  <div className="space-y-4">
                    {transaction.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>${transaction.subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Tax</p>
                    <p>${transaction.tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>${transaction.shipping.toFixed(2)}</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p className="gradient-text-accent">${transaction.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-card border-none bg-white dark:bg-slate-900 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
              <CardHeader>
                <CardTitle className="text-indigo-600 dark:text-indigo-400">Buyer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                    <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                    <dd className="mt-1">
                      <Link
                        href={`/dashboard/buyers/${transaction.buyerId}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {transaction.buyerName}
                      </Link>
                    </dd>
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                    <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                    <dd className="mt-1">{transaction.buyerEmail}</dd>
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                    <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                    <dd className="mt-1">{transaction.buyerPhone}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="shadow-card border-none bg-white dark:bg-slate-900 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-violet-500 to-indigo-500"></div>
              <CardHeader>
                <CardTitle className="text-violet-600 dark:text-violet-400">Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                    <dt className="text-sm font-medium text-muted-foreground">Payment Method</dt>
                    <dd className="mt-1">{transaction.paymentMethod}</dd>
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                    <dt className="text-sm font-medium text-muted-foreground">Transaction Date</dt>
                    <dd className="mt-1">{new Date(transaction.date).toLocaleDateString()}</dd>
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                    <dt className="text-sm font-medium text-muted-foreground">Payment ID</dt>
                    <dd className="mt-1">{transaction.paymentId || "N/A"}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="shadow-card border-none bg-white dark:bg-slate-900 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-amber-500 to-red-500"></div>
              <CardHeader>
                <CardTitle className="text-amber-600 dark:text-amber-400">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                  {transaction.notes || "No additional notes for this transaction."}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full rounded-full">
                  Add Note
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

