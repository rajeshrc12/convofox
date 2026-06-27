import Dashboard from "@/routes/dashboard"
import { createBrowserRouter } from "react-router"
import Home from "@/routes/dashboard/home"
import App from "@/App"
import Meeting from "@/routes/dashboard/meeting-list"
import MeetingId from "@/routes/meeting/id"

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "list",
        Component: Meeting,
      },
    ],
  },
  {
    path: "/meeting/:id",
    Component: MeetingId,
  },
])

export default router
