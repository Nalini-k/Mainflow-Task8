import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Users, ShoppingBag, DollarSign } from "lucide-react"
import { LineChart } from "@/components/charts/line-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { BarChart } from "@/components/charts/bar-chart"
import {
  getSalesData,
  getProductCategoriesData,
  getRecentTransactionsData,
  getTopSellingProductsData,
} from "@/lib/chart-data"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View and manage buyers, products, and transactions",
}

export default function DashboardPage() {
  const salesData = getSalesData()
  const productCategoriesData = getProductCategoriesData()
  const recentTransactionsData = getRecentTransactionsData()
  const topSellingProductsData = getTopSellingProductsData()

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight gradient-text-primary">Welcome to your Dashboard</h1>
          <p className="text-muted-foreground">
            Use the navigation to view details of buyers, products, and transactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in animate-delay-100">
          <Card className="shadow-card">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Buyers</p>
                <h3 className="text-2xl font-bold">1,248</h3>
                <p className="text-xs text-emerald-500 flex items-center mt-1">
                  <Activity className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-2 rounded-full bg-violet-100 dark:bg-violet-900/50">
                <ShoppingBag className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <h3 className="text-2xl font-bold">584</h3>
                <p className="text-xs text-emerald-500 flex items-center mt-1">
                  <Activity className="h-3 w-3 mr-1" />
                  +5% from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50">
                <ShoppingBag className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <h3 className="text-2xl font-bold">3,672</h3>
                <p className="text-xs text-emerald-500 flex items-center mt-1">
                  <Activity className="h-3 w-3 mr-1" />
                  +18% from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">$86,429</h3>
                <p className="text-xs text-emerald-500 flex items-center mt-1">
                  <Activity className="h-3 w-3 mr-1" />
                  +24% from last month
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in animate-delay-200">
          <Card className="lg:col-span-2 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Sales Overview</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></div>
                    <span className="text-xs text-muted-foreground">This Year</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-violet-300 mr-1"></div>
                    <span className="text-xs text-muted-foreground">Last Year</span>
                  </div>
                </div>
              </div>
              <div className="h-[300px]">
                <LineChart data={salesData} />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
              <div className="h-[300px]">
                <PieChart data={productCategoriesData} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in animate-delay-300">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
              <div className="h-[250px]">
                <BarChart data={recentTransactionsData} />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
              <div className="h-[250px]">
                <BarChart data={topSellingProductsData} horizontal={true} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

