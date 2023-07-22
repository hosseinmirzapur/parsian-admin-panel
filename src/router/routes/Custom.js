import { lazy } from "react"

const CustomRoutes = [
	{
		path: "/orders/submit",
		component: lazy(() => import("../../views/custom-pages/orders")),
		exact: true,
	},
	{
		path: "/orders/list",
		component: lazy(() => import("../../views/custom-pages/orders/list")),
		exact: true,
	},
]

export default CustomRoutes
