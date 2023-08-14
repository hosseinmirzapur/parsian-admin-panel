import { lazy } from "react"
// import { Redirect } from "react-router-dom"

const PagesRoutes = [
	{
		path: "/login",
		component: lazy(() => import("../../views/pages/authentication/Login")),
		layout: "BlankLayout",
	},
	{
		path: "/pages/profile",
		component: lazy(() => import("../../views/pages/profile")),
	},
	{
		path: "/pages/account-settings",
		component: lazy(() => import("../../views/pages/account-settings")),
	},
	{
		path: "/misc/not-authorized",
		component: lazy(() => import("../../views/pages/misc/NotAuthorized")),
		layout: "BlankLayout",
	},
	{
		path: "/misc/maintenance",
		component: lazy(() => import("../../views/pages/misc/Maintenance")),
		layout: "BlankLayout",
	},
	{
		path: "/misc/error",
		component: lazy(() => import("../../views/pages/misc/Error")),
		layout: "BlankLayout",
	},
]

export default PagesRoutes
