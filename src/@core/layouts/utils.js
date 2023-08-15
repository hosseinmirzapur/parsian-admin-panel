/**
 * Return which component to render based on it's data/context
 * @param {Object} item nav menu item
 */
export const resolveVerticalNavMenuItemComponent = (item) => {
	if (item.header) return "VerticalNavMenuSectionHeader"
	if (item.children) return "VerticalNavMenuGroup"
	return "VerticalNavMenuLink"
}

/**
 * Return which component to render based on it's data/context
 * @param {Object} item nav menu item
 */
export const resolveHorizontalNavMenuItemComponent = (item) => {
	if (item.children) return "HorizontalNavMenuGroup"
	return "HorizontalNavMenuLink"
}

export const isNavLinkActive = (link, currentURL, routerProps) => {
	return (
		currentURL === link ||
		(routerProps &&
			routerProps.meta &&
			routerProps.meta.navLink &&
			routerProps.meta.navLink === link)
	)
	// return currentURL === link
}

export const isNavGroupActive = (children, currentURL, routerProps) => {
	return children.some((child) => {
		// If child have children => It's group => Go deeper(recursive)
		if (child.children) {
			return isNavGroupActive(child.children, currentURL, routerProps)
		}
		// else it's link => Check for matched Route
		return isNavLinkActive(child.navLink, currentURL, routerProps)
	})
}

export const search = (navigation, currentURL, routerProps) => {
	let result
	navigation.some((child) => {
		let children
		// If child have children => It's group => Go deeper(recursive)
		if (
			child.children &&
			(children = search(child.children, currentURL, routerProps))
		) {
			return (result = {
				id: child.id,
				children,
			})
		}

		// else it's link => Check for matched Route
		if (isNavLinkActive(child.navLink, currentURL, routerProps)) {
			return (result = {
				id: child.id,
			})
		}
	})
	return result
}

/**
 * Loop through nested object
 * @param {object} obj nested object
 */
export const getAllParents = (obj, match) => {
	const res = []
	const recurse = (obj, current) => {
		for (const key in obj) {
			const value = obj[key]
			if (value !== undefined) {
				if (value && typeof value === "object") {
					recurse(value, key)
				} else {
					if (key === match) {
						res.push(value)
					}
				}
			}
		}
	}
	recurse(obj)
	return res
}
