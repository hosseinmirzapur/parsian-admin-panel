import { useState } from "react"
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Label,
	Input,
	CustomInput,
} from "reactstrap"

import server, {
	handleError,
	handleSuccess,
	showLoader,
} from "../../../../utility/server"

const EditModal = ({ isOpen, toggleOpen, item, onSuccess }) => {
	// ** Variables
	const [status, setStatus] = useState("")

	// ** Functions
	const reloadInputs = () => {
		setStatus("")
	}

	const handleAction = async () => {
		showLoader(true)
		const data = {
			status: status == "" ? item?.Status : status,
		}
		await server
			.put(`/order-item/${item?.id}`, data)
			.then(async () => {
				await handleSuccess("وضعیت آیتم به روزرسانی شد")
				toggleOpen()
				onSuccess()
			})
			.catch(async () => {
				await handleError("خطایی در تغییر وضعیت رخ داد")
				toggleOpen()
			})
	}

	return (
		<Modal isOpen={isOpen} toggle={toggleOpen} centered onClosed={reloadInputs}>
			<ModalHeader toggle={toggleOpen} />
			<ModalBody
				className="d-flex flex-column"
				style={{
					gap: "20px",
				}}>
				<div className="d-flex flex-column">
					<Label>وضعیت سفارش</Label>
					<Input type="select" onChange={(e) => setStatus(e.target.value)}>
						<option value="">موردی را انتخاب نمایید</option>
						<option value="PENDING">در حال بررسی</option>
						<option value="PARTIAL">پرداخت جزئی</option>
						<option value="OFFICE">حساب دفتری</option>
						<option value="PAID">پرداخت شده</option>
					</Input>
				</div>
			</ModalBody>
			<ModalFooter className="d-flex justify-content-around">
				<Button color="primary" onClick={handleAction}>
					تایید
				</Button>
				<Button color="danger" onClick={toggleOpen}>
					لغو
				</Button>
			</ModalFooter>
		</Modal>
	)
}

export default EditModal
