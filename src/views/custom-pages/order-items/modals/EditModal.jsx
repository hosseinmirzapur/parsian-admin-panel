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
	const [name, setName] = useState("")
	const [allowSandPaper, setAllowSandPaper] = useState(!!item?.AllowSandPaper)
	const [allowDestruction, setAllowDestruction] = useState(
		!!item?.AllowDestruction,
	)
	const [testType, setTestType] = useState("")
	const [quantity, setQuantity] = useState(0)

	// ** Functions
	const reloadInputs = () => {
		setStatus("")
		setName("")
		setAllowSandPaper(false)
		setAllowDestruction(false)
		setTestType("")
		setQuantity(0)
	}

	const ifNotReady = () => {
		return status == "" && name == "" && testType == "" && quantity == 0
	}

	const handleAction = async () => {
		showLoader(true)
		const data = {
			status: status == "" ? item?.Status : status,
			name: name == "" ? item?.Name : name,
			allow_sand_paper: allowSandPaper,
			allow_destruction: allowDestruction,
			test_type: testType == "" ? item?.TestType : testType,
			quantity: quantity == 0 ? +item?.Quantity : +quantity,
		}
		await server
			.put(`/oi/update/${item?.Id}`, data)
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
				<div>
					<Label>نام قطعه</Label>
					<Input
						type="text"
						defaultValue={item?.Name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="d-flex justify-content-around">
					<div>
						<Label>اجازه سنباده</Label>
						<CustomInput
							type="switch"
							onChange={() => setAllowSandPaper(!allowSandPaper)}
							checked={allowSandPaper}
							id="allowsandpaper"
						/>
					</div>
					<div>
						<Label>اجازه تخریب</Label>
						<CustomInput
							type="switch"
							onChange={() => setAllowDestruction(!allowDestruction)}
							checked={allowDestruction}
							id="allowdestruction"
						/>
					</div>
				</div>
				<div>
					<Label>نوع آزمون</Label>
					<Input
						type="select"
						defaultValue={item?.TestType}
						onChange={(e) => setTestType(e.target.value)}>
						<option value="">موردی را انتخاب کنید</option>
						<option value="analyze">آنالیز</option>
						<option value="hardness">سختی</option>
						<option value="both">هر دو</option>
					</Input>
				</div>
				<div>
					<Label>تعداد</Label>
					<Input
						type="number"
						defaultValue={item?.Quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
				</div>

				<div className="d-flex flex-column">
					<Label>وضعیت سفارش</Label>
					<Input type="select" onChange={(e) => setStatus(e.target.value)}>
						<option value="">موردی را انتخاب نمایید</option>
						<option value="pending">در حال بررسی</option>
						<option value="partial">پرداخت جزئی</option>
						<option value="office">حساب دفتری</option>
						<option value="paid">پرداخت شده</option>
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
