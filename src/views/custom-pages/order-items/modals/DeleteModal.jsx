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

const DeleteModal = ({ isOpen, toggleOpen, item, onSuccess }) => {
	const handleAction = async () => {
		showLoader(true)

		await server
			.delete(`/oi/delete/${item?.Id}`)
			.then(async () => {
				await handleSuccess("آیتم مورد نظر با موفقیت حذف شد")
				toggleOpen()
				onSuccess()
			})
			.catch(async () => {
				await handleError("خطایی رخ داده است")
				toggleOpen()
			})
	}

	return (
		<Modal isOpen={isOpen} toggle={toggleOpen} centered>
			<ModalHeader toggle={toggleOpen} />
			<ModalBody
				className="d-flex flex-column"
				style={{
					gap: "20px",
				}}>
				<h4>آیا مطمئنید که میخواهید این مورد را حذف کنید؟</h4>
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

export default DeleteModal