"use client"

import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getTransactionsByBuyerId } from "@/lib/data"

interface BuyerPurchaseHistoryProps {
  buyerId: string
}

export function BuyerPurchaseHistory({ buyerId }: BuyerPurchaseHistoryProps) {
  const transactions = getTransactionsByBuyerId(buyerId)

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
    <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-card overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
          <TableRow>
            <TableHead className="text-amber-600 dark:text-amber-400">Transaction ID</TableHead>
            <TableHead className="text-amber-600 dark:text-amber-400">Date</TableHead>
            <TableHead className="text-amber-600 dark:text-amber-400">Items</TableHead>
            <TableHead className="text-amber-600 dark:text-amber-400">Total</TableHead>
            <TableHead className="text-amber-600 dark:text-amber-400">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                No purchase history found
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <TableCell>
                  <Link
                    href={`/dashboard/transactions/${transaction.id}`}
                    className="text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    #{transaction.id}
                  </Link>
                </TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800"
                  >
                    {transaction.items.length} items
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">${transaction.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

