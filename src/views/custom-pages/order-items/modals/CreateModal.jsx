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

const CreateModal = ({ isOpen, toggleOpen, orderId, onSuccess }) => {
	// ** Variables
	const [status, setStatus] = useState("")
	const [name, setName] = useState("")
	const [allowSandPaper, setAllowSandPaper] = useState(false)
	const [allowDestruction, setAllowDestruction] = useState(false)
	const [testType, setTestType] = useState("")
	const [quantity, setQuantity] = useState(0)
	const [image, setImage] = useState(null)
	const [imagePreview, setImagePreview] = useState("")

	// ** Functions
	const reloadInputs = () => {
		setStatus("")
		setName("")
		setAllowSandPaper(false)
		setAllowDestruction(false)
		setTestType("")
		setQuantity(0)
		setImage(null)
		setImagePreview("")
	}

	const fillImage = (e) => {
		if (e.target.files[0]) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setImagePreview(reader.result)
				setImage(e.target.files[0])
			}
			reader.readAsDataURL(e.target.files[0])
		}
	}

	const clearImage = () => {
		setImage(null)
		setImagePreview("")
	}

	const ifNotReady = () => {
		return (
			status == "" ||
			name == "" ||
			testType == "" ||
			quantity == 0 ||
			image == null
		)
	}

	const handleAction = async () => {
		showLoader(true)
		const fd = new FormData()
		fd.append("status", status)
		fd.append("name", name)
		fd.append("allow_sand_paper", +allowSandPaper)
		fd.append("allow_destruction", +allowDestruction)
		fd.append("test_type", testType)
		fd.append("quantity", quantity)
		fd.append("image", image)

		await server
			.post(`/oi/create/${orderId}`, fd)
			.then(async () => {
				await handleSuccess("آیتم جدید افزوده شد")
				toggleOpen()
				onSuccess()
			})
			.catch(async () => {
				await handleError("خطایی در ایجاد این آیتم رخ داد")
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
					<Input type="text" onChange={(e) => setName(e.target.value)} />
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
					<Input type="select" onChange={(e) => setTestType(e.target.value)}>
						<option value="">موردی را انتخاب کنید</option>
						<option value="analyze">آنالیز</option>
						<option value="hardness">سختی</option>
					</Input>
				</div>
				<div>
					<Label>تعداد</Label>
					<Input type="number" onChange={(e) => setQuantity(e.target.value)} />
				</div>

				<div>
					<Label>وضعیت سفارش</Label>
					<Input type="select" onChange={(e) => setStatus(e.target.value)}>
						<option value="">موردی را انتخاب نمایید</option>
						<option value="pending">در حال بررسی</option>
						<option value="partial">پرداخت جزئی</option>
						<option value="office">حساب دفتری</option>
						<option value="paid">پرداخت شده</option>
					</Input>
				</div>

				<div>
					<Label>تصویر آیتم</Label>
					<CustomInput
						type="file"
						id="orderItemImage"
						onChange={fillImage}
						accept="image/*"
					/>
				</div>
				{image && (
					<div
						className="d-flex flex-column justify-content-center align-items-center"
						style={{
							gap: "10px",
						}}>
						<img src={imagePreview} alt="" className="w-75" />
						<Button color="danger" onClick={clearImage}>
							حذف عکس
						</Button>
					</div>
				)}
			</ModalBody>
			<ModalFooter className="d-flex justify-content-around">
				<Button color="primary" onClick={handleAction} disabled={ifNotReady()}>
					تایید
				</Button>
				<Button color="danger" onClick={toggleOpen}>
					لغو
				</Button>
			</ModalFooter>
		</Modal>
	)
}

export default CreateModal
