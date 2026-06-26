import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import App from "./App"
import Dashboard from "@/routes/dashboard"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
)
