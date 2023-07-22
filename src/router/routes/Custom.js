import { lazy } from "react"

const CustomRoutes = [
	{
		path: "/orders",
		component: lazy(() => import("../../views/custom-pages/orders")),
		exact: true,
	},
]

export default CustomRoutes
