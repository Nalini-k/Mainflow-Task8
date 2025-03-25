import type { Metadata } from "next"
import DashboardShell from "@/components/dashboard-shell"
import { TransactionsTable } from "@/components/transactions/transactions-table"
import { TransactionsSearch } from "@/components/transactions/transactions-search"

export const metadata: Metadata = {
  title: "Transactions",
  description: "View and manage transaction information",
}

export default function TransactionsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
        </div>
        <div className="space-y-4">
          <TransactionsSearch />
          <TransactionsTable />
        </div>
      </div>
    </DashboardShell>
  )
}

