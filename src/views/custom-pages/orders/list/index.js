import { Eye, MoreVertical, Printer, RefreshCcw } from "react-feather"
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
import { useState } from "react"
import ChangeStatusModal from "./modals/ChangeStatusModal"
import DetailsModal from "./modals/DetailsModal"

const sampleData = [
	{
		id: 1,
		name: "محمدرضا همافر",
		mobile: "09123456789",
		status: 1, // 0 is for not_recieved, 1 is for pending and 2 is for recieved
	},
	{
		id: 2,
		name: "پارسا همافر",
		mobile: "09129876543",
		status: 2, // 0 is for not_recieved, 1 is for pending and 2 is for recieved
	},
	{
		id: 3,
		name: "محمد مهدی شکرانی",
		mobile: "09120369456",
		status: 0, // 0 is for not_recieved, 1 is for pending and 2 is for recieved
	},
]

const StatusBadge = ({ status }) => {
	switch (status) {
		case 0:
			return (
				<Badge color="danger" pill>
					تحویل داده نشده
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

	// ** Functions
	const toggleStatusModal = () => setStatusModal(!statusModal)
	const toggleDetailsModal = () => setDetailsModal(!detailsModal)

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
								<th>اقدامات</th>
							</tr>
						</thead>
						<tbody>
							{sampleData.map((item, index) => (
								<tr key={item.id}>
									<td>{index + 1}</td>
									<td>{item.name}</td>
									<td>{item.mobile}</td>
									<td>
										<StatusBadge status={item.status} />
									</td>
									<td>
										<UncontrolledDropdown direction="left">
											<DropdownToggle tag="div" className="btn btn-sm">
												<MoreVertical size={14} className="cursor-pointer" />
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem
													className="w-100"
													onClick={() => {
														setSelectedOrder(item)
														toggleStatusModal()
													}}>
													<RefreshCcw size={16} className="mr-50" />
													تغییر وضعیت سفارش
												</DropdownItem>
												<DropdownItem
													className="w-100"
													onClick={() => {
														setSelectedOrder(item)
														toggleDetailsModal()
													}}>
													<Eye size={16} className="mr-50" />
													مشاهده جزییات
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
