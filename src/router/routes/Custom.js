import { lazy } from "react"

const CustomRoutes = [
	{
		path: "/orders/list",
		component: lazy(() => import("../../views/custom-pages/orders/list")),
		exact: true,
	},
	{
		path: "/orders/:id",
		component: lazy(() => import("../../views/custom-pages/order-items")),
		exact: true,
	},
]

export default CustomRoutes
