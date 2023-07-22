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

import { ShoppingCart } from "react-feather"

export default [
	{
		id: "order",
		title: "ثبت سفارش",
		icon: <ShoppingCart />,
		navLink: "/orders",
	},
]
