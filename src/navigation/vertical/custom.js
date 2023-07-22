// interface NavItem {
//     id: string
//     title: string
//     icon: import("react-feather").Icon
//     navLink: string
//     permissions?: string[]
//     newTab?: boolean
//     children?: NavItem[]
//     externalLink?: boolean
// }

import { List, ShoppingCart } from "react-feather"

export default [
	{
		id: "createOrder",
		title: "ثبت سفارش",
		icon: <ShoppingCart />,
		navLink: "/orders/submit",
	},
	{
		id: "order-list",
		title: "لیست سفارشات",
		icon: <List />,
		navLink: "/orders/list",
	},
]
