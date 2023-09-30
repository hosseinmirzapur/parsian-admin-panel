// ** React Imports
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

// ** Utils
import server, { handleError, showLoader } from "../../../utility/server"

// UI imports
import {
	Table,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Breadcrumb,
	BreadcrumbItem,
	Card,
	CardBody,
} from "reactstrap"
import { MoreVertical, Trash2, Edit, Eye } from "react-feather"
import ShowOrderItemPic from "./modals/ShowOrderItemPic"
import EditModal from "./modals/EditModal"
import DeleteModal from "./modals/DeleteModal"

const OrderItemPage = () => {
	// ** Variables
	const [reload, setReload] = useState(false)
	const [orderItemPic, setOrderItemPic] = useState(false)
	const [editModal, setEditModal] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)
	const [order, setOrder] = useState({})
	const [selectedItem, setSelectedItem] = useState({})
	const { id } = useParams()

	// ** Functions
	const toggleReload = () => setReload(!reload)
	const toggleOrderItemPic = () => setOrderItemPic(!orderItemPic)
	const toggleEditModal = () => setEditModal(!editModal)
	const toggleDeleteModal = () => setDeleteModal(!deleteModal)
	const select = (item) => setSelectedItem(item)

	const handleTestType = (testType) => {
		switch (testType) {
			case "ANALYZE":
				return "آنالیز"
			case "HARDNESS":
				return "سختی"
			case "BOTH":
				return "هر دو"
			default:
				return ""
		}
	}

	const handleStatus = (status) => {
		switch (status) {
			case "PENDING":
				return "در حال بررسی"
			case "PARTIAL":
				return "پرداخت جزئی"
			case "OFFICE":
				return "حساب دفتری"
			case "PAID":
				return "پرداخت شده"
			default:
				return ""
		}
	}

	const fetchOrder = async () => {
		showLoader(true)
		await server
			.get(`/order/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then(async (res) => {
				const serverOrder = res?.data?.order
				const formattedOrder = {
					id: serverOrder?.id,
					createdAt: serverOrder?.created_at,
					orderItems: serverOrder?.order_items,
					phoneNumber: serverOrder?.mobile,
					customerName: serverOrder?.customer_name,
					specialId: serverOrder?.special_id,
				}

				setOrder(formattedOrder)
				showLoader(false)
			})
			.catch(async () => {
				await handleError("خطایی در دریافت این سفارش رخ داده است")
			})
	}

	useEffect(async () => {
		await fetchOrder()
	}, [reload])
	return (
		<>
			<Breadcrumb>
				<BreadcrumbItem
					active
					tag={Link}
					to="/orders/list"
					className="text-primary">
					سفارشات
				</BreadcrumbItem>
				<BreadcrumbItem>
					<span>{order?.specialId}</span>
				</BreadcrumbItem>
			</Breadcrumb>
			<Card>
				<CardBody>
					<Table
						hover
						style={{
							margin: "0 0 100px 0",
						}}
						responsive>
						<thead>
							<tr>
								<th>#</th>
								<th>نام قطعه</th>
								<th>اجازه سنباده</th>
								<th>اجازه تخریب</th>
								<th>نوع آزمون</th>
								<th>تعداد</th>
								<th>وضعیت</th>
								<th>عملیات</th>
							</tr>
						</thead>
						<tbody>
							{order?.orderItems?.length > 0 ? (
								order?.orderItems?.map((item, index) => (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{item.name}</td>
										<td>{item.sand_paper ? "دارد" : "ندارد"}</td>
										<td>{item.destruction ? "دارد" : "ندارد"}</td>
										<td>{handleTestType(item?.test_type)}</td>
										<td>{item.quantity}</td>
										<td>{handleStatus(item?.status)}</td>
										<td>
											<UncontrolledDropdown direction="left">
												<DropdownToggle tag="div" className="btn btn-sm">
													<MoreVertical size={14} className="cursor-pointer" />
												</DropdownToggle>
												<DropdownMenu>
													<DropdownItem
														className="w-100"
														onClick={() => {
															select(item)
															toggleOrderItemPic(item.image)
														}}>
														<Eye size={16} className="mr-50" />
														مشاهده تصویر
													</DropdownItem>
													<DropdownItem
														className="w-100"
														onClick={() => {
															select(item)
															toggleEditModal()
														}}>
														<Edit size={16} className="mr-50" />
														ویرایش
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
								))
							) : (
								<tr>
									<td colSpan="8" className="text-center">
										آیتمی یافت نشد
									</td>
								</tr>
							)}
						</tbody>
					</Table>
					<ShowOrderItemPic
						imageSrc={selectedItem.image}
						isOpen={orderItemPic}
						toggleModal={toggleOrderItemPic}
					/>
					<EditModal
						isOpen={editModal}
						toggleOpen={toggleEditModal}
						item={selectedItem}
						onSuccess={toggleReload}
					/>

					<DeleteModal
						isOpen={deleteModal}
						endpoint={"/order-item"}
						item={selectedItem}
						onSuccess={toggleReload}
						toggleOpen={toggleDeleteModal}
						isOi
					/>
				</CardBody>
			</Card>
		</>
	)
}

export default OrderItemPage
