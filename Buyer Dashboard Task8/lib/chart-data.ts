// Sales data for the dashboard charts
export const getSalesData = () => {
  return {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "This Year",
        data: [18500, 22000, 19500, 24000, 25500, 27000, 29500, 32000, 35000, 37500, 40000, 43000],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        fill: false,
      },
      {
        label: "Last Year",
        data: [15000, 17000, 16500, 19000, 21000, 22500, 24000, 26500, 28000, 30000, 32500, 35000],
        borderColor: "rgb(139, 92, 246)",
        backgroundColor: "rgba(139, 92, 246, 0.5)",
        fill: false,
        borderDash: [5, 5],
      },
    ],
  }
}

export const getProductCategoriesData = () => {
  return {
    labels: ["Electronics", "Furniture", "Clothing", "Kitchen", "Sports", "Books"],
    datasets: [
      {
        data: [35, 20, 15, 12, 10, 8],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderColor: [
          "rgb(99, 102, 241)",
          "rgb(139, 92, 246)",
          "rgb(245, 158, 11)",
          "rgb(16, 185, 129)",
          "rgb(59, 130, 246)",
          "rgb(239, 68, 68)",
        ],
        borderWidth: 1,
      },
    ],
  }
}

export const getRecentTransactionsData = () => {
  return {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Transactions",
        data: [12, 19, 15, 22, 25, 17, 10],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 1,
      },
    ],
  }
}

export const getTopSellingProductsData = () => {
  return {
    labels: [
      "Premium Wireless Headphones",
      "Ergonomic Office Chair",
      "Smart Fitness Watch",
      "Organic Cotton T-Shirt",
      "Professional Blender",
    ],
    datasets: [
      {
        label: "Units Sold",
        data: [125, 95, 80, 65, 50],
        backgroundColor: [
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
        borderColor: [
          "rgb(245, 158, 11)",
          "rgb(239, 68, 68)",
          "rgb(16, 185, 129)",
          "rgb(59, 130, 246)",
          "rgb(139, 92, 246)",
        ],
        borderWidth: 1,
      },
    ],
  }
}

