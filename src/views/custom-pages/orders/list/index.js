import { Box, MoreVertical, Printer, Search, Trash2 } from "react-feather"
import {
	Card,
	CardHeader,
	CardBody,
	Button,
	Table,
	Badge,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Input,
} from "reactstrap"
import { useEffect, useState } from "react"
import server, {
	checkAuth,
	handleError,
	showLoader,
} from "../../../../utility/server"
import { useHistory } from "react-router-dom"
import DeleteModal from "../../order-items/modals/DeleteModal"

const StatusBadge = ({ status }) => {
	switch (status) {
		case 0:
			return (
				<Badge color="danger" pill>
					سفارش خالی
				</Badge>
			)
		case 1:
			return (
				<Badge color="secondary" pill>
					در انتظار تحویل
				</Badge>
			)
		case 2:
			return (
				<Badge color="success" pill>
					تحویل داده شده
				</Badge>
			)
		default:
			return (
				<Badge color="outline-danger" pill>
					خطا در ثبت سفارش
				</Badge>
			)
	}
}

const OrdersList = () => {
	// ** Variables
	const [search, setSearch] = useState("")
	const [removeSearch, setRemoveSearch] = useState(false)
	const [orders, setOrders] = useState([])
	const [selected, setSelected] = useState({})
	const [deleteModal, setDeleteModal] = useState(false)
	const [reload, setReload] = useState(false)
	const history = useHistory()

	// ** Functions
	const toggleReload = () => setReload(!reload)
	const toggleRemoveSearch = () => setRemoveSearch(!removeSearch)
	const toggleDeleteModal = () => setDeleteModal(!deleteModal)
	const fillSearch = (e) => setSearch(e.target.value)
	const select = (item) => setSelected(item)
	const formatedOrders = (orders) => {
		const orderList = []

		orders?.map((order) => {
			let status = 0
			let foundOrderItem = order?.OrderItems?.find(
				(item) => item?.Status != "paid",
			)
			if (foundOrderItem != null) {
				status = 1
			} else {
				status = 2
			}
			if (order?.OrderItems?.length == 0) {
				status = 0
			}
			orderList.push({
				id: order?.Id,
				name: order?.CustomerName,
				mobile: order?.PhoneNumber,
				specialId: order?.SpecialId,
				hasOrderItems: () => order?.OrderItems?.length > 0,
				orderItems: order.OrderItems,
				status,
			})
		})

		return orderList.reverse()
	}

	const formatOneOrder = (order) => {
		const orderList = []

		let status = 0
		let foundOrderItem = order?.OrderItems?.find(
			(item) => item?.Status != "paid",
		)
		if (foundOrderItem != null) {
			status = 1
		} else {
			status = 2
		}
		if (order?.OrderItems?.length == 0) {
			status = 0
		}
		orderList.push({
			id: order?.Id,
			name: order?.CustomerName,
			mobile: order?.PhoneNumber,
			specialId: order?.SpecialId,
			hasOrderItems: () => order?.OrderItems?.length > 0,
			orderItems: order.OrderItems,
			status,
		})

		return orderList.reverse()
	}

	const getOrders = async () => {
		showLoader(true)
		await server
			.get("/order/all")
			.then(async (res) => {
				const orders = res?.data?.orders

				setOrders(formatedOrders(orders))

				showLoader(false)
			})
			.catch(() => handleError("هطایی در دریافت سفارشات رخ داده است"))
	}

	const handleSearch = async () => {
		showLoader(true)
		server
			.get(`/order/special/${search}`)
			.then((res) => {
				const order = res?.data?.order
				setOrders(formatOneOrder(order))
				showLoader(false)
				toggleRemoveSearch()
			})
			.catch(() => handleError("سفارشی با این کد رهگیری یافت"))
	}

	useEffect(async () => {
		await checkAuth()
		await getOrders()
		setRemoveSearch(false)
	}, [reload])

	return (
		<>
			<Card>
				<CardHeader
					className="d-flex justify-content-md-between"
					style={{
						gap: "20px",
					}}>
					<Button
						color={"success"}
						className={"d-flex align-items-center justify-content-center"}
						style={{
							gap: "10px",
						}}>
						<Printer size={15} />
						خروجی اکسل
					</Button>
					<div
						className="d-flex"
						style={{
							gap: "10px",
						}}>
						<Button
							color="outline-danger"
							onClick={toggleReload}
							hidden={!removeSearch}>
							مشاهده همه
						</Button>
						<Button
							color="primary"
							size="small"
							disabled={search == ""}
							onClick={handleSearch}>
							<Search size={15} />
						</Button>
						<Input
							type="search"
							placeholder="جستجوی کد رهگیری"
							onChange={fillSearch}
						/>
					</div>
				</CardHeader>
				<CardBody>
					<Table responsive hover>
						<thead>
							<tr>
								<th>#</th>
								<th>نام مشتری</th>
								<th>شماره تماس</th>
								<th>وضعیت تحویل</th>
								<th>کد رهگیری</th>
								<th>اقدامات</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((item, index) => (
								<tr key={item.id}>
									<td>{index + 1}</td>
									<td>{item.name}</td>
									<td>{item.mobile}</td>
									<td>
										<StatusBadge status={item.status} />
									</td>
									<td>{item.specialId}</td>
									<td>
										<UncontrolledDropdown direction="left">
											<DropdownToggle tag="div" className="btn btn-sm">
												<MoreVertical size={14} className="cursor-pointer" />
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem
													className="w-100"
													onClick={() => {
														history.push(`/orders/${item.id}`)
													}}>
													<Box size={16} className="mr-50" />
													آیتم های سفارش
												</DropdownItem>
												<DropdownItem
													className="w-100"
													onClick={() => {
														select(item)
														toggleDeleteModal()
													}}>
													<Trash2 size={16} className="mr-50" />
													حذف
												</DropdownItem>
											</DropdownMenu>
										</UncontrolledDropdown>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<DeleteModal
						endpoint={"/order/delete"}
						item={selected}
						isOpen={deleteModal}
						onSuccess={toggleReload}
						toggleOpen={toggleDeleteModal}
					/>
				</CardBody>
			</Card>
		</>
	)
}

export default OrdersList
