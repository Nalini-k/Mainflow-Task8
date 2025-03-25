"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData, type ChartOptions } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
  data: ChartData<"pie">
  options?: ChartOptions<"pie">
}

export function PieChart({ data, options }: PieChartProps) {
  const { theme } = useTheme()
  const chartRef = useRef<ChartJS<"pie">>(null)

  useEffect(() => {
    // Update chart colors based on theme
    if (chartRef.current) {
      chartRef.current.update()
    }
  }, [theme])

  const defaultOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: theme === "dark" ? "#e2e8f0" : "#475569",
          font: {
            family: "Arial, sans-serif",
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || ""
            const value = context.formattedValue
            return `${label}: ${value}%`
          },
        },
      },
    },
  }

  return (
    <div className="h-full w-full">
      <Pie ref={chartRef} data={data} options={options || defaultOptions} />
    </div>
  )
}

