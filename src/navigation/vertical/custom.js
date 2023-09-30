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

import { List } from "react-feather"

export default [
	{
		id: "order-list",
		title: "لیست سفارشات",
		icon: <List />,
		navLink: "/orders/list",
	},
]
