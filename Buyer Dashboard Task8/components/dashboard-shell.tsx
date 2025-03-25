"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Package, ShoppingCart, Menu, X, Sun, Moon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { UserDropdown } from "@/components/user-dropdown"

interface DashboardShellProps {
  children: React.ReactNode
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sidebarState, setSidebarState] = useLocalStorage("sidebar-state", "expanded")

  useEffect(() => {
    setMounted(true)
  }, [])

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
      color: "text-indigo-500",
      hoverColor: "hover:text-indigo-600",
      activeColor: "text-indigo-600",
    },
    {
      href: "/dashboard/buyers",
      label: "Buyers",
      icon: Users,
      active: pathname.includes("/dashboard/buyers"),
      color: "text-violet-500",
      hoverColor: "hover:text-violet-600",
      activeColor: "text-violet-600",
    },
    {
      href: "/dashboard/products",
      label: "Products",
      icon: Package,
      active: pathname.includes("/dashboard/products"),
      color: "text-amber-500",
      hoverColor: "hover:text-amber-600",
      activeColor: "text-amber-600",
    },
    {
      href: "/dashboard/transactions",
      label: "Transactions",
      icon: ShoppingCart,
      active: pathname.includes("/dashboard/transactions"),
      color: "text-emerald-500",
      hoverColor: "hover:text-emerald-600",
      activeColor: "text-emerald-600",
    },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      alert(`Searching for: ${searchTerm}`)
      // In a real app, you would implement actual search functionality
    }
  }

  const toggleSidebar = () => {
    const newState = sidebarState === "expanded" ? "collapsed" : "expanded"
    setSidebarState(newState)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80 px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <div className="h-8 w-8 rounded-md gradient-bg-primary flex items-center justify-center">
                    <Package className="h-5 w-5 text-white" />
                  </div>
                  <span className="gradient-text-primary font-bold">Admin Dashboard</span>
                </Link>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <nav className="grid gap-2 p-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out",
                      route.active
                        ? `${route.activeColor} bg-slate-100 dark:bg-slate-800`
                        : `${route.color} hover:bg-slate-100 dark:hover:bg-slate-800 ${route.hoverColor}`,
                    )}
                  >
                    <route.icon className={cn("h-5 w-5", route.active ? route.activeColor : route.color)} />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex rounded-full" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="h-8 w-8 rounded-md gradient-bg-primary flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="hidden md:inline-block gradient-text-primary font-bold">Admin Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 md:grow-0 md:w-[200px]">
          <form className="relative" onSubmit={handleSearch}>
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-slate-100 dark:bg-slate-800 pl-8 md:w-[200px] lg:w-[300px] border-none focus-visible:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>
        </div>
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 mx-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-all duration-200 ease-in-out",
                route.active ? route.activeColor : `text-muted-foreground ${route.hoverColor}`,
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-500" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <UserDropdown />
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 max-w-[1600px] mx-auto w-full">{children}</main>
    </div>
  )
}

