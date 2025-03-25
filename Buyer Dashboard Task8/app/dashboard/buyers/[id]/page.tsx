import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import DashboardShell from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BuyerPurchaseHistory } from "@/components/buyers/buyer-purchase-history"
import { getBuyerById } from "@/lib/data"

export const metadata: Metadata = {
  title: "Buyer Details",
  description: "View detailed buyer information",
}

export default function BuyerDetailsPage({ params }: { params: { id: string } }) {
  const buyer = getBuyerById(params.id)

  if (!buyer) {
    notFound()
  }

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6 animate-fade-in">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild className="rounded-full">
            <Link href="/dashboard/buyers">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to buyers</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight gradient-text-primary">{buyer.name}</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-card border-none bg-white dark:bg-slate-900 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
            <CardHeader>
              <CardTitle className="text-indigo-600 dark:text-indigo-400">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                  <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                  <dd className="mt-1 text-indigo-600 dark:text-indigo-400">{buyer.email}</dd>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                  <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                  <dd className="mt-1">{buyer.phone}</dd>
                </div>
                <div className="sm:col-span-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                  <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                  <dd className="mt-1">{buyer.address}</dd>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                  <dt className="text-sm font-medium text-muted-foreground">Registration Date</dt>
                  <dd className="mt-1">{new Date(buyer.registrationDate).toLocaleDateString()}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="shadow-card border-none bg-white dark:bg-slate-900 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-violet-500 to-indigo-500"></div>
            <CardHeader>
              <CardTitle className="text-violet-600 dark:text-violet-400">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                  <dt className="text-sm font-medium text-muted-foreground">Total Spent</dt>
                  <dd className="mt-1 text-2xl font-bold gradient-text-primary">${buyer.totalSpent.toFixed(2)}</dd>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                  <dt className="text-sm font-medium text-muted-foreground">Total Orders</dt>
                  <dd className="mt-1 text-2xl font-bold gradient-text-secondary">{buyer.totalOrders}</dd>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                  <dt className="text-sm font-medium text-muted-foreground">Preferred Payment</dt>
                  <dd className="mt-1">{buyer.preferredPayment}</dd>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                  <dt className="text-sm font-medium text-muted-foreground">Last Purchase</dt>
                  <dd className="mt-1">{new Date(buyer.lastPurchase).toLocaleDateString()}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="purchase-history" className="animate-fade-in animate-delay-100">
          <TabsList className="bg-slate-100 dark:bg-slate-800/50 p-1">
            <TabsTrigger
              value="purchase-history"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400"
            >
              Purchase History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="purchase-history" className="mt-4">
            <Card className="shadow-card border-none bg-white dark:bg-slate-900 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-amber-500 to-red-500"></div>
              <CardHeader>
                <CardTitle className="text-amber-600 dark:text-amber-400">Purchase History</CardTitle>
                <CardDescription>View all transactions made by this buyer</CardDescription>
              </CardHeader>
              <CardContent>
                <BuyerPurchaseHistory buyerId={buyer.id} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

