"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface LineChartProps {
  data: ChartData<"line">
  options?: ChartOptions<"line">
}

export function LineChart({ data, options }: LineChartProps) {
  const { theme } = useTheme()
  const chartRef = useRef<ChartJS<"line">>(null)

  useEffect(() => {
    // Update chart colors based on theme
    if (chartRef.current) {
      chartRef.current.update()
    }
  }, [theme])

  const defaultOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
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
    elements: {
      line: {
        tension: 0.3,
      },
      point: {
        radius: 3,
        hoverRadius: 5,
      },
    },
  }

  return (
    <div className="h-full w-full">
      <Line ref={chartRef} data={data} options={options || defaultOptions} />
    </div>
  )
}

