import { useState, Fragment } from "react"
import Avatar from "@components/avatar"
import { useSkin } from "@hooks/useSkin"
import { useDispatch } from "react-redux"
import { toast, Slide } from "react-toastify"
import { handleLogin } from "@store/actions/auth"
import { Link, useHistory } from "react-router-dom"
import InputPasswordToggle from "@components/input-password-toggle"
import { Coffee } from "react-feather"
import { AvForm, AvInput } from "availity-reactstrap-validation-safe"
import {
	Row,
	Col,
	CardTitle,
	CardText,
	FormGroup,
	Label,
	CustomInput,
	Button,
} from "reactstrap"
import Logo from "@src/assets/images/main-logo.png"
import "@styles/base/pages/page-auth.scss"
import server from "../../../utility/server"

const ToastContent = ({ name, role }) => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<Avatar size="sm" color="success" icon={<Coffee size={12} />} />
				<h6 className="toast-title font-weight-bold">خوش آمدید, {name}</h6>
			</div>
		</div>
		<div className="toastify-body">
			<span>شما با موفقیت به عنوان {role} وارد شدید!</span>
		</div>
	</Fragment>
)

const ErrorToast = () => {
	return (
		<div
			className="d-flex"
			style={{
				gap: "10px",
			}}>
			<div className="toastify-header">
				<div className="title-wrapper">
					<Avatar size="sm" color="danger" icon={<Coffee size={12} />} />
				</div>
			</div>
			<div className="toastify-body">
				<span>خطایی رخ داده است</span>
			</div>
		</div>
	)
}

const Login = (props) => {
	const [skin, setSkin] = useSkin()
	const dispatch = useDispatch()
	const history = useHistory()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
		source = require(`@src/assets/images/pages/${illustration}`).default

	const handleSubmit = async (event, errors) => {
		if (errors && !errors.length) {
			await server
				.post("/admin/login", { username: email, password })
				.then((res) => {
					const data = res.data
					const token = data.token

					localStorage.setItem("token", token)
					dispatch(handleLogin(data))
					history.push("/dashboard")
					window.location.reload()
					toast.success(
						<ToastContent name={data.admin.username} role={"ادمین کل"} />,
						{ transition: Slide, hideProgressBar: true, autoClose: 2000 },
					)
				})
				.catch((err) => {
					console.log(err)
					toast.error(<ErrorToast />, {
						transition: Slide,
						hideProgressBar: true,
						autoClose: 20000,
					})
				})
		}
	}

	return (
		<div className="auth-wrapper auth-v2">
			<Row className="auth-inner m-0">
				<Link className="brand-logo pb-10" to="/">
					<img src={Logo} width={100} height={100} />
				</Link>
				<Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
					<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
						<img className="img-fluid" src={source} alt="Login V2" />
					</div>
				</Col>
				<Col
					className="d-flex align-items-center auth-bg px-2 p-lg-5"
					lg="4"
					sm="12">
					<Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
						<CardTitle tag="h2" className="font-weight-bold mb-1">
							به پنل ادمین پارسیان خوش آمدید 👋
						</CardTitle>
						<CardText className="mb-2">
							جهت مدیریت سفارشات ابتدا وارد شوید
						</CardText>
						<AvForm className="auth-login-form mt-2" onSubmit={handleSubmit}>
							<FormGroup>
								<Label className="form-label" for="login-email">
									ایمیل
								</Label>
								<AvInput
									required
									autoFocus
									type="email"
									value={email}
									id="login-email"
									name="login-email"
									placeholder="john@example.com"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<div className="d-flex justify-content-between">
									<Label className="form-label" for="login-password">
										رمز عبور
									</Label>
								</div>
								<InputPasswordToggle
									required
									tag={AvInput}
									value={password}
									id="login-password"
									name="login-password"
									className="input-group-merge"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<CustomInput
									type="checkbox"
									className="custom-control-Primary"
									id="remember-me"
									label="مرا به خاطر بسپار"
								/>
							</FormGroup>
							<Button.Ripple
								color="primary"
								block
								disabled={!email.length || !password.length}>
								ورود
							</Button.Ripple>
						</AvForm>
					</Col>
				</Col>
			</Row>
		</div>
	)
}

export default Login
