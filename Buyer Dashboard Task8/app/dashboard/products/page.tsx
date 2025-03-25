import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard-shell"
import { ProductsTable } from "@/components/products/products-table"
import { ProductsSearch } from "@/components/products/products-search"

export const metadata: Metadata = {
  title: "Products",
  description: "View and manage product information",
}

export default function ProductsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        </div>
        <div className="space-y-4">
          <ProductsSearch />
          <ProductsTable />
        </div>
      </div>
    </DashboardShell>
  )
}

