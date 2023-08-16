import { Eye, MoreVertical, Plus, Printer, RefreshCcw } from "react-feather"
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
} from "reactstrap"
import { useEffect, useState } from "react"
import ChangeStatusModal from "./modals/ChangeStatusModal"
import DetailsModal from "./modals/DetailsModal"
import server, {
	handleError,
	handleSuccess,
	showLoader,
} from "../../../../utility/server"

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
	const [statusModal, setStatusModal] = useState(false)
	const [detailsModal, setDetailsModal] = useState(false)
	const [selectedOrder, setSelectedOrder] = useState({})
	const [orders, setOrders] = useState([])
	const [reload, setReload] = useState(false)

	// ** Functions
	const toggleStatusModal = () => setStatusModal(!statusModal)
	const toggleDetailsModal = () => setDetailsModal(!detailsModal)
	const toggleReload = () => setReload(!reload)
	const getOrders = async () => {
		showLoader(true)
		await server
			.get("/order/all")
			.then(async (res) => {
				const orders = res?.data?.orders
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
				setOrders(orderList.reverse())

				showLoader(false)
			})
			.catch(() => handleError("هطایی در دریافت سفارشات رخ داده است"))
	}

	useEffect(async () => {
		await getOrders()
	}, [reload])

	return (
		<>
			<Card>
				<CardHeader>
					<Button
						color={"success"}
						style={{
							display: "flex",
							flexDirection: "row",
							gap: "10px",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Printer size={15} />
						پرینت سفارشات
					</Button>
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
													hidden={!item.hasOrderItems()}
													className="w-100"
													onClick={() => {
														setSelectedOrder(item)
														toggleStatusModal()
													}}>
													<RefreshCcw size={16} className="mr-50" />
													تغییر وضعیت سفارش
												</DropdownItem>
												<DropdownItem
													hidden={!item.hasOrderItems()}
													className="w-100"
													onClick={() => {
														setSelectedOrder(item)
														toggleDetailsModal()
													}}>
													<Eye size={16} className="mr-50" />
													مشاهده جزییات
												</DropdownItem>
												<DropdownItem
													hidden={item.hasOrderItems()}
													className="w-100"
													onClick={() => {
														setSelectedOrder(item)
														toggleDetailsModal()
													}}>
													<Plus size={16} className="mr-50" />
													افزودن آیتم به سفارش
												</DropdownItem>
											</DropdownMenu>
										</UncontrolledDropdown>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</CardBody>
			</Card>
			<ChangeStatusModal
				isOpen={statusModal}
				toggleOpen={toggleStatusModal}
				order={selectedOrder}
			/>
			<DetailsModal
				isOpen={detailsModal}
				order={selectedOrder}
				toggleOpen={toggleDetailsModal}
			/>
		</>
	)
}

export default OrdersList
