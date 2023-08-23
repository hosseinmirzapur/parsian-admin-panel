import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"

import server, {
	handleError,
	handleSuccess,
	showLoader,
} from "../../../../utility/server"

const DeleteModal = ({
	isOpen,
	toggleOpen,
	item,
	endpoint,
	onSuccess,
	isOi,
}) => {
	const handleAction = async () => {
		showLoader(true)

		const itemId = isOi ? item?.Id : item?.id
		await server
			.delete(`${endpoint}/${itemId}`)
			.then(async () => {
				await handleSuccess("این مورد با موفقیت حذف شد")
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
