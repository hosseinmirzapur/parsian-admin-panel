import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap"

const ShowOrderItemPic = ({ imageSrc, toggleModal, isOpen }) => {
	const downloadPic = () => {
		const a = document.createElement("a")
		a.href = imageSrc
		a.target = "_blank"
		a.click()
		a.hidden = true
		a.remove()
	}

	return (
		<Modal isOpen={isOpen} toggle={toggleModal} centered>
			<ModalHeader toggle={toggleModal} />
			<ModalBody className="d-flex justify-content-center align-items-center">
				{imageSrc != "" ? (
					<div
						className="d-flex flex-column justify-content-center align-items-center"
						style={{
							gap: "10px",
						}}>
						<img src={imageSrc} alt="عکس-سفارش" className="w-75" />
						<Button color="primary" onClick={downloadPic}>
							دانلود عکس
						</Button>
					</div>
				) : (
					"این مورد عکسی ندارد"
				)}
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={toggleModal}>
					متوجه شدم
				</Button>
			</ModalFooter>
		</Modal>
	)
}

export default ShowOrderItemPic
