import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard-shell"
import { BuyersTable } from "@/components/buyers/buyers-table"
import { BuyersSearch } from "@/components/buyers/buyers-search"

export const metadata: Metadata = {
  title: "Buyers",
  description: "View and manage buyer information",
}

export default function BuyersPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Buyers</h1>
        </div>
        <div className="space-y-4">
          <BuyersSearch />
          <BuyersTable />
        </div>
      </div>
    </DashboardShell>
  )
}

