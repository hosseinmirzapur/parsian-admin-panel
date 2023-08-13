import PagesRoutes from "./Pages"
import DashboardRoutes from "./Dashboards"
import CustomRoutes from "./Custom"

// ** Document title
const TemplateTitle = "%s - پارسیان"

// ** Default Route
const DefaultRoute = "/dashboard"

// ** Merge Routes
const Routes = [...DashboardRoutes, ...CustomRoutes, ...PagesRoutes]

export { DefaultRoute, TemplateTitle, Routes }
