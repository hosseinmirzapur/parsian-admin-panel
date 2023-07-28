import { useState } from "react"
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Label,
	Input,
} from "reactstrap"

const ChangeStatusModal = ({ isOpen, toggleOpen, order }) => {
	// ** Variables
	const [status, setStatus] = useState(-1)

	// ** Functions
	const reloadInputs = () => {
		setStatus(-1)
	}
	const handleAction = async () => {
		alert(
			`This is the order: ${JSON.stringify(
				order,
			)}, you tried to alternate status to ${status}`,
		)
	}

	return (
		<Modal isOpen={isOpen} toggle={toggleOpen} centered onClosed={reloadInputs}>
			<ModalHeader toggle={toggleOpen} />
			<ModalBody
				className="d-flex flex-column"
				style={{
					gap: "10px",
				}}>
				<Label>وضعیت سفارش را انتخاب نمایید</Label>
				<Input type="select" onChange={(e) => setStatus(e.target.value)}>
					<option value={0}>تحویل داده نشده</option>
					<option value={1}>در انتظار تحویل</option>
					<option value={2}>تحویل داده شده</option>
				</Input>
			</ModalBody>
			<ModalFooter className="d-flex justify-content-between">
				<Button color="primary" onClick={handleAction} disabled={status === -1}>
					تایید
				</Button>
				<Button color="danger" onClick={toggleOpen}>
					لغو
				</Button>
			</ModalFooter>
		</Modal>
	)
}

export default ChangeStatusModal
