import { Formik, ErrorMessage } from "formik"
import { Input, Button, Label } from "reactstrap"

const OrderForm = () => {
	const initialValues = {
		customerFullName: "",
		customerMobile: "",
		sampleName: "",
		testType: "",
		referredTestStandard: "",
		samplePreparation: "",
	}

	// ** Functions
	const validationRules = (values) => {
		const errors = {}

		if (!values.customerFullName) {
			errors.customerFullName = "پر کردن این فیلد الزامیست"
		}
		if (!values.customerMobile) {
			errors.customerMobile = "پر کردن این فیلد الزامیست"
		}
		if (values.customerMobile.length < 11) {
			errors.customerMobile = "شماره موبایل نامعتبر"
		}
		if (!values.sampleName) {
			errors.sampleName = "پر کردن این فیلد الزامیست"
		}
		if (!values.testType) {
			errors.testType = "پر کردن این فیلد الزامیست"
		}
		if (!values.referredTestStandard) {
			errors.referredTestStandard = "پر کردن این فیلد الزامیست"
		}
		if (!values.samplePreparation) {
			errors.samplePreparation = "پر کردن این فیلد الزامیست"
		}
		return errors
	}

	const handleParsianForm = (values, { setSubmitting }) => {
		setTimeout(() => {
			alert(JSON.stringify(values, null, 2))
			setSubmitting(false)
		}, 400)
	}

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
									width: "80%",
									display: "flex",
									flexDirection: "column",
									gap: "40px",
								}}>
								<div>
									<Label>نام مشتری</Label>
									<Input
										type="text"
										name="customerFullName"
										onChange={handleChange}
										value={values.customerFullName}
									/>
									<ErrorMessage
										className="text-danger"
										name="customerFullName"
										component="small"
									/>
								</div>
								<div>
									<Label>شماره تماس مشتری</Label>
									<Input
										type="text"
										name="customerMobile"
										onChange={handleChange}
										value={values.customerMobile}
									/>
									<ErrorMessage
										className="text-danger"
										name="customerMobile"
										component="small"
									/>
								</div>
								<div>
									<Label>نام قطعه</Label>
									<Input
										type="text"
										name="sampleName"
										onChange={handleChange}
										value={values.sampleName}
									/>
									<ErrorMessage
										className="text-danger"
										name="sampleName"
										component="small"
									/>
								</div>
							</div>
							<div
								style={{
									width: "80%",
									display: "flex",
									flexDirection: "column",
									gap: "40px",
								}}>
								<div>
									<Label>نوع آزمون</Label>
									<Input
										type="text"
										name="testType"
										onChange={handleChange}
										value={values.testType}
									/>
									<ErrorMessage
										className="text-danger"
										name="testType"
										component="small"
									/>
								</div>
								<div>
									<Label>استاندارد مرجع آزمون</Label>
									<Input
										type="text"
										name="referredTestStandard"
										onChange={handleChange}
										value={values.referredTestStandard}
									/>
									<ErrorMessage
										className="text-danger"
										name="referredTestStandard"
										component="small"
									/>
								</div>
								<div>
									<Label>آماده سازی نمونه</Label>
									<Input
										type="text"
										name="samplePreparation"
										onChange={handleChange}
										value={values.samplePreparation}
									/>
									<ErrorMessage
										className="text-danger"
										name="samplePreparation"
										component="small"
									/>
								</div>
							</div>
						</div>
						<div
							className="d-flex justify-content-center justify-content-md-start"
							style={{ marginTop: "40px", marginBottom: "20px" }}>
							<Button
								color="primary"
								type="submit"
								disabled={isSubmitting}
								onClick={handleSubmit}>
								ثبت سفارش
							</Button>
						</div>
					</div>
				)}
			</Formik>
		</>
	)
}

export default OrderForm
