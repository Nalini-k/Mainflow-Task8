"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Filter, Calendar } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { format } from "date-fns"

export function TransactionsSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useLocalStorage("transactions-filter-status", "")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isFiltered, setIsFiltered] = useState(false)

  // Store date as ISO string in local storage
  const [storedDate, setStoredDate] = useLocalStorage<string | null>("transactions-filter-date", null)

  // Sync date with stored date
  useEffect(() => {
    if (storedDate) {
      setDate(new Date(storedDate))
    }
  }, [storedDate])

  // Update stored date when date changes
  useEffect(() => {
    if (date) {
      setStoredDate(date.toISOString())
    } else {
      setStoredDate(null)
    }
  }, [date, setStoredDate])

  useEffect(() => {
    setIsFiltered(status !== "" || date !== undefined)
  }, [status, date])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      alert(`Searching for transactions: ${searchTerm}`)
      // In a real app, you would implement actual search functionality
    }
  }

  const handleApplyFilters = () => {
    alert(`Filters applied: Status: ${status || "Any"}, Date: ${date ? format(date, "PP") : "Any"}`)
    // In a real app, you would apply these filters to your data
  }

  const handleResetFilters = () => {
    setStatus("")
    setDate(undefined)
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <form className="relative flex-1" onSubmit={handleSearch}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by ID, buyer, or product..."
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
              className={isFiltered ? "bg-emerald-500 hover:bg-emerald-600" : ""}
            >
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-4" align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Any status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
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

