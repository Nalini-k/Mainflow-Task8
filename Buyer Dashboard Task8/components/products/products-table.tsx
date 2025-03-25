"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, ChevronsUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getProducts } from "@/lib/data"

export function ProductsTable() {
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [categoryFilter, setCategoryFilter] = useState<string>("")
  const [stockFilter, setStockFilter] = useState<string>("")

  const products = getProducts()

  const filteredProducts = products.filter((product) => {
    if (categoryFilter && product.category !== categoryFilter) return false
    if (stockFilter === "in-stock" && product.stock === 0) return false
    if (stockFilter === "low-stock" && (product.stock === 0 || product.stock >= 10)) return false
    if (stockFilter === "out-of-stock" && product.stock > 0) return false
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a]
    const bValue = b[sortField as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: string) => {
    if (field !== sortField) return <ChevronsUpDown className="ml-2 h-4 w-4" />
    return sortDirection === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  const getStockStatusColor = (stockLevel: number) => {
    if (stockLevel === 0)
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
    if (stockLevel < 10)
      return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800"
    return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
  }

  const getStockStatusText = (stockLevel: number) => {
    if (stockLevel === 0) return "Out of Stock"
    if (stockLevel < 10) return "Low Stock"
    return "In Stock"
  }

  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-card overflow-hidden animate-fade-in">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("name")}
                className="flex items-center font-medium text-amber-600 dark:text-amber-400"
              >
                Product Name {getSortIcon("name")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("category")}
                className="flex items-center font-medium text-amber-600 dark:text-amber-400"
              >
                Category {getSortIcon("category")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("price")}
                className="flex items-center font-medium text-amber-600 dark:text-amber-400"
              >
                Price {getSortIcon("price")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("stock")}
                className="flex items-center font-medium text-amber-600 dark:text-amber-400"
              >
                Stock {getSortIcon("stock")}
              </Button>
            </TableHead>
            <TableHead className="hidden lg:table-cell">Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts.map((product) => (
            <TableRow key={product.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <TableCell className="font-medium">
                <Link
                  href={`/dashboard/products/${product.id}`}
                  className="hover:underline text-amber-600 dark:text-amber-400"
                >
                  {product.name}
                </Link>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800"
                >
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStockStatusColor(product.stock)}>
                  {getStockStatusText(product.stock)} ({product.stock})
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell max-w-[300px] truncate text-muted-foreground">
                {product.description}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Link href={`/dashboard/products/${product.id}`} className="w-full">
                        View details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit product</DropdownMenuItem>
                    <DropdownMenuItem>Delete product</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

