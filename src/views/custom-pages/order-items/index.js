import { useEffect, useState } from "react"
import server, {
	checkAuth,
	handleError,
	// handleSuccess,
	showLoader,
} from "../../../utility/server"
import { useParams } from "react-router-dom"

const OrderItemPage = () => {
	// ** Variables
	const [reload, setReload] = useState(false)
	const { id } = useParams()

	// ** Functions
	const toggleReload = () => setReload(!reload)
	const fetchOrder = async () => {
		showLoader(true)
		await server
			.get(`/order/${id}`)
			.then((res) => {
				console.log(res.data)
				showLoader(false)
			})
			.catch((err) => {
				console.log(err)
				handleError("کار نمیکنه فعلا")
			})
	}

	useEffect(async () => {
		await checkAuth()
		await fetchOrder()
	}, [reload])
	return <div>Order Number : {id}</div>
}

export default OrderItemPage
