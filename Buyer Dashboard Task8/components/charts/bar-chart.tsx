"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  data: ChartData<"bar">
  options?: ChartOptions<"bar">
  horizontal?: boolean
}

export function BarChart({ data, options, horizontal = false }: BarChartProps) {
  const { theme } = useTheme()
  const chartRef = useRef<ChartJS<"bar">>(null)

  useEffect(() => {
    // Update chart colors based on theme
    if (chartRef.current) {
      chartRef.current.update()
    }
  }, [theme])

  const defaultOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? ("y" as const) : ("x" as const),
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: theme === "dark" ? "#e2e8f0" : "#475569",
          font: {
            family: "Arial, sans-serif",
            size: 12,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: theme === "dark" ? "#94a3b8" : "#64748b",
        },
      },
      y: {
        grid: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: theme === "dark" ? "#94a3b8" : "#64748b",
        },
      },
    },
  }

  return (
    <div className="h-full w-full">
      <Bar ref={chartRef} data={data} options={options || defaultOptions} />
    </div>
  )
}

