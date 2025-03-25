"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { useLocalStorage } from "@/hooks/use-local-storage"

export function BuyersSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useLocalStorage("buyers-filter-location", "")
  const [dateRange, setDateRange] = useLocalStorage("buyers-filter-date-range", "")
  const [isFiltered, setIsFiltered] = useState(false)

  useEffect(() => {
    setIsFiltered(location !== "" || dateRange !== "")
  }, [location, dateRange])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      alert(`Searching for buyers: ${searchTerm}`)
      // In a real app, you would implement actual search functionality
    }
  }

  const handleApplyFilters = () => {
    alert(`Filters applied: Location: ${location || "Any"}, Date Range: ${dateRange || "Any"}`)
    // In a real app, you would apply these filters to your data
  }

  const handleResetFilters = () => {
    setLocation("")
    setDateRange("")
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <form className="relative flex-1" onSubmit={handleSearch}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, email, or phone..."
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
              className={isFiltered ? "bg-violet-500 hover:bg-violet-600" : ""}
            >
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-4" align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Any location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any location</SelectItem>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="los-angeles">Los Angeles</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="miami">Miami</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-range">Registration Date</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger id="date-range">
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="last-week">Last week</SelectItem>
                    <SelectItem value="last-month">Last month</SelectItem>
                    <SelectItem value="last-year">Last year</SelectItem>
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

