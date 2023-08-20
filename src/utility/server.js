import axios from "axios"
import alert from "sweetalert2"

const notAuthorized = () => {
	return (
		localStorage.getItem("token") === "" ||
		localStorage.getItem("token") === null ||
		localStorage.getItem("token") === "Bearer null"
	)
}

const serverUrl = "https://parsian.iran.liara.run/api/v1"
const localUrl = "http://localhost:8000/api/v1"

const server = axios.create({
	baseURL: serverUrl,
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	},
})

export const handleError = async (msg) => {
	alert.fire({
		icon: "error",
		title: "خطا",
		text: msg,
		confirmButtonText: "متوجه شدم",
		position: "center",
		timer: 5000,
		customClass: {
			confirmButton: "btn btn-primary",
		},
		buttonsStyling: false,
	})
}

export const handleSuccess = async (msg) => {
	alert.fire({
		icon: "success",
		title: "موفق",
		text: msg,
		confirmButtonText: "متوجه شدم",
		position: "center",
		timer: 5000,
		customClass: {
			confirmButton: "btn btn-primary",
		},
		buttonsStyling: false,
	})
}

export const checkAuth = async () => {
	server.get("/auth/check").catch(async () => {
		window.location.replace("/login")
		localStorage.clear()
		await handleError("جهت دسترسی به پنل وارد شوید")
	})
}

export const showLoader = (show) => {
	show ? alert.showLoading() : alert.close()
}

export default server
