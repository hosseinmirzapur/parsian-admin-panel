// ** React Imports
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

// ** Utils
import server, {
	checkAuth,
	handleError,
	handleSuccess,
	showLoader,
} from "../../../utility/server"

// UI imports
import {
	CardHeader,
	Table,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Card,
	CardBody,
} from "reactstrap"
import { MoreVertical, Trash2, Edit, RefreshCcw, Eye } from "react-feather"
import ShowOrderItemPic from "./modals/ShowOrderItemPic"

const OrderItemPage = () => {
	// ** Variables
	const [reload, setReload] = useState(false)
	const [orderItemPic, setOrderItemPic] = useState(false)
	const [order, setOrder] = useState({})
	const [selectedItem, setSelectedItem] = useState({})
	const { id } = useParams()

	// ** Functions
	const toggleReload = () => setReload(!reload)
	const toggleOrderItemPic = () => setOrderItemPic(!orderItemPic)
	const select = (item) => setSelectedItem(item)

	const fetchOrder = async () => {
		showLoader(true)
		await server
			.get(`/order/${id}`)
			.then(async (res) => {
				const serverOrder = res?.data?.order
				const formattedOrder = {
					id: serverOrder?.Id,
					createdAt: serverOrder?.CreatedAt,
					orderItems: serverOrder?.OrderItems,
					phoneNumber: serverOrder?.PhoneNumber,
					customerName: serverOrder?.CustomerName,
					specialId: serverOrder?.SpecialId,
				}

				setOrder(formattedOrder)
				showLoader(false)
			})
			.catch(async () => {
				await handleError("خطایی در دریافت این سفارش رخ داده است")
			})
	}

	useEffect(async () => {
		await checkAuth()
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
				<BreadcrumbItem>{order?.specialId || "---"}</BreadcrumbItem>
			</Breadcrumb>
			<Card>
				<CardHeader className="d-flex justify-content-between">
					<h3>{order?.customerName || "---"}</h3>
					<Button color="primary">افزودن آیتم جدید</Button>
				</CardHeader>
				<CardBody>
					<Table hover responsive>
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
										<td>{item.Name}</td>
										<td>{item.AllowSandPaper ? "دارد" : "ندارد"}</td>
										<td>{item.AllowDestruction ? "دارد" : "ندارد"}</td>
										<td>{item.TestType}</td>
										<td>{item.Quantity}</td>
										<td>{item.Status}</td>
										<td>
											<UncontrolledDropdown direction="left">
												<DropdownToggle tag="div" className="btn btn-sm">
													<MoreVertical size={14} className="cursor-pointer" />
												</DropdownToggle>
												<DropdownMenu>
													<DropdownItem className="w-100">
														<RefreshCcw size={16} className="mr-50" />
														تغییر وضعیت
													</DropdownItem>
													<DropdownItem
														className="w-100"
														onClick={() => {
															select(item)
															toggleOrderItemPic(item.ImageSrc)
														}}>
														<Eye size={16} className="mr-50" />
														مشاهده تصویر
													</DropdownItem>
													<DropdownItem className="w-100">
														<Trash2 size={16} className="mr-50" />
														حذف
													</DropdownItem>
													<DropdownItem className="w-100">
														<Edit size={16} className="mr-50" />
														ویرایش
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
						imageSrc={selectedItem.FilePath}
						isOpen={orderItemPic}
						toggleModal={toggleOrderItemPic}
					/>
				</CardBody>
			</Card>
		</>
	)
}

export default OrderItemPage
