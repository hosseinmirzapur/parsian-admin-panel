import { Formik, ErrorMessage } from "formik"
import { Input, Button, Label, Alert } from "reactstrap"
import server, {
	handleError,
	handleSuccess,
	showLoader,
	checkAuth,
} from "../../../utility/server"
import { useEffect } from "react"

const OrderForm = () => {
	const initialValues = {
		phoneNumber: "",
		customerName: "",
	}

	// ** Functions
	const validationRules = (values) => {
		const errors = {}

		if (!values.customerName) {
			errors.customerName = "پر کردن این فیلد الزامیست"
		}
		if (!values.phoneNumber) {
			errors.phoneNumber = "پر کردن این فیلد الزامیست"
		}
		if (values.phoneNumber.length != 11) {
			errors.phoneNumber = "شماره موبایل نامعتبر"
		}
		return errors
	}

	const handleParsianForm = async (values, { setSubmitting }) => {
		setSubmitting(true)
		showLoader(true)
		await server
			.post("/order/create", {
				phone_number: values.phoneNumber,
				customer_name: values.customerName,
			})
			.then(async () => {
				await handleSuccess("عملیات موفقیت آمیز بود")
			})
			.catch(async () => {
				await handleError("خطایی رخ داده است")
			})
		setSubmitting(false)
	}

	useEffect(() => {
		checkAuth()
	}, [])

	return (
		<>
			<h1
				style={{
					marginBottom: "40px",
				}}>
				فرم ثبت سفارش
			</h1>
			<Formik
				initialValues={initialValues}
				validate={validationRules}
				onSubmit={handleParsianForm}>
				{({ values, handleChange, handleSubmit, isSubmitting }) => (
					<div
						style={{
							marginBottom: "20px",
						}}>
						<div
							className="d-flex flex-column flex-md-row"
							style={{
								gap: "40px",
							}}>
							<div
								style={{
									width: "70%",
									margin: "auto",
									display: "flex",
									flexDirection: "column",
									gap: "40px",
								}}
								className="w-md-50">
								<div>
									<Label>نام مشتری</Label>
									<Input
										type="text"
										name="customerName"
										onChange={handleChange}
										value={values.customerName}
									/>
									<ErrorMessage
										className="text-danger"
										name="customerName"
										component="small"
									/>
								</div>
								<div>
									<Label>شماره تماس مشتری</Label>
									<Input
										type="text"
										name="phoneNumber"
										onChange={handleChange}
										value={values.phoneNumber}
									/>
									<ErrorMessage
										className="text-danger"
										name="phoneNumber"
										component="small"
									/>
								</div>
							</div>
						</div>
						<div
							className="d-flex justify-content-center align-items-center"
							style={{ marginTop: "40px", marginBottom: "20px" }}>
							<Button
								color="primary"
								type="submit"
								disabled={isSubmitting}
								onClick={handleSubmit}>
								ثبت سفارش
							</Button>
						</div>

						<div className="d-flex w-md-80 margin-auto justify-content-center align-items-center mt-5">
							<Alert color="success" isOpen={true}>
								<h5>
									در صورت ثبت سفارش جدید، به قسمت لیست سفارشات رفته تا آیتم های
									سفارش را اضافه کنید
								</h5>
							</Alert>
						</div>
					</div>
				)}
			</Formik>
		</>
	)
}

export default OrderForm
