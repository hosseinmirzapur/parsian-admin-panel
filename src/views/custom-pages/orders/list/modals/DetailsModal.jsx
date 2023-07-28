import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"

const DetailsModal = ({ isOpen, toggleOpen, order }) => {
	return (
		<Modal isOpen={isOpen} toggle={toggleOpen} centered>
			<ModalHeader toggle={toggleOpen} />
			<ModalBody>
				{/* <div>{JSON.stringify(order)}</div> */}

				<h3>به زودی...</h3>
			</ModalBody>
			<ModalFooter className="d-flex justify-content-center align-items-center">
				<Button color="primary" onClick={toggleOpen}>
					متوجه شدم
				</Button>
			</ModalFooter>
		</Modal>
	)
}

export default DetailsModal
