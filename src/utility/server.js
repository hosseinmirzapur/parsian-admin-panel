import axios from "axios"

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
		Authorization: notAuthorized()
			? ""
			: `Bearer ${localStorage.getItem("token")}`,
	},
})

export default server
