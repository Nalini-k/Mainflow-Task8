import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import DashboardShell from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProductById, getRelatedProducts } from "@/lib/data"

export const metadata: Metadata = {
  title: "Product Details",
  description: "View detailed product information",
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.category, product.id)

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
    <DashboardShell>
      <div className="flex flex-col space-y-6 animate-fade-in">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild className="rounded-full">
            <Link href="/dashboard/products">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to products</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight gradient-text-secondary">{product.name}</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-card border-none bg-white dark:bg-slate-900 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-amber-500 to-red-500"></div>
            <CardHeader>
              <CardTitle className="text-amber-600 dark:text-amber-400">Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <div className="gradient-border">
                    <div className="gradient-border-content">
                      <Image
                        src="/placeholder.svg"
                        alt={product.name}
                        width={200}
                        height={200}
                        className="rounded-md object-cover w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <dl className="grid grid-cols-1 gap-4">
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                      <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                      <dd className="mt-1">
                        <Badge
                          variant="outline"
                          className="bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800"
                        >
                          {product.category}
                        </Badge>
                      </dd>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                      <dt className="text-sm font-medium text-muted-foreground">Price</dt>
                      <dd className="mt-1 text-2xl font-bold gradient-text-secondary">${product.price.toFixed(2)}</dd>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                      <dt className="text-sm font-medium text-muted-foreground">Stock Status</dt>
                      <dd className="mt-1">
                        <Badge variant="outline" className={getStockStatusColor(product.stock)}>
                          {getStockStatusText(product.stock)} ({product.stock} units)
                        </Badge>
                      </dd>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                      <dt className="text-sm font-medium text-muted-foreground">Description</dt>
                      <dd className="mt-1">{product.description}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card border-none bg-white dark:bg-slate-900 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-500 to-amber-500"></div>
            <CardHeader>
              <CardTitle className="text-amber-600 dark:text-amber-400">Supplier Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4">
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                  <dt className="text-sm font-medium text-muted-foreground">Supplier Name</dt>
                  <dd className="mt-1 font-medium">{product.supplier.name}</dd>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                  <dt className="text-sm font-medium text-muted-foreground">Contact</dt>
                  <dd className="mt-1">{product.supplier.contact}</dd>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                  <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                  <dd className="mt-1">{product.supplier.email}</dd>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                  <dt className="text-sm font-medium text-muted-foreground">Lead Time</dt>
                  <dd className="mt-1">{product.supplier.leadTime} days</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card border-none bg-white dark:bg-slate-900 overflow-hidden animate-fade-in animate-delay-100">
          <div className="h-2 bg-gradient-to-r from-violet-500 to-indigo-500"></div>
          <CardHeader>
            <CardTitle className="text-violet-600 dark:text-violet-400">Related Products</CardTitle>
            <CardDescription>Other products in the same category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/dashboard/products/${relatedProduct.id}`} className="block group">
                  <div className="border rounded-md p-4 transition-all duration-200 hover:border-amber-500 dark:hover:border-amber-600 shadow-card">
                    <div className="aspect-square relative mb-2 overflow-hidden rounded-md">
                      <Image
                        src="/placeholder.svg"
                        alt={relatedProduct.name}
                        fill
                        className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400 truncate transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

