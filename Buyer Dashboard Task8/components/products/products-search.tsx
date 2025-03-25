"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { getProductCategories } from "@/lib/data"
import { useLocalStorage } from "@/hooks/use-local-storage"

export function ProductsSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useLocalStorage("products-filter-category", "")
  const [stockStatus, setStockStatus] = useLocalStorage("products-filter-stock", "")
  const [priceRange, setPriceRange] = useLocalStorage("products-filter-price", "")
  const [isFiltered, setIsFiltered] = useState(false)

  const categories = getProductCategories()

  useEffect(() => {
    setIsFiltered(category !== "" || stockStatus !== "" || priceRange !== "")
  }, [category, stockStatus, priceRange])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      alert(`Searching for products: ${searchTerm}`)
      // In a real app, you would implement actual search functionality
    }
  }

  const handleApplyFilters = () => {
    alert(
      `Filters applied: Category: ${category || "All"}, Stock: ${stockStatus || "Any"}, Price: ${priceRange || "Any"}`,
    )
    // In a real app, you would apply these filters to your data
  }

  const handleResetFilters = () => {
    setCategory("")
    setStockStatus("")
    setPriceRange("")
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <form className="relative flex-1" onSubmit={handleSearch}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={isFiltered ? "default" : "outline"}
              size="icon"
              className={isFiltered ? "bg-amber-500 hover:bg-amber-600" : ""}
            >
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-4" align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock-status">Stock Status</Label>
                <Select value={stockStatus} onValueChange={setStockStatus}>
                  <SelectTrigger id="stock-status">
                    <SelectValue placeholder="Any status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any status</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price-range">Price Range</Label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger id="price-range">
                    <SelectValue placeholder="Any price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any price</SelectItem>
                    <SelectItem value="0-50">$0 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="200+">$200+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleApplyFilters}>
                  Apply
                </Button>
                {isFiltered && (
                  <Button size="sm" variant="outline" onClick={handleResetFilters}>
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

