import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap"

const ShowOrderItemPic = ({ imageSrc, toggleModal, isOpen }) => {
	return (
		<Modal isOpen={isOpen} toggle={toggleModal} centered>
			<ModalHeader toggle={toggleModal} />
			<ModalBody className="d-flex justify-content-center align-items-center">
				{imageSrc ? (
					<img src={imageSrc} alt="عکس-سفارش" className="w-75" />
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
