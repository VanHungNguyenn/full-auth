import { notification } from 'antd'

export const showSuccessMsg = (msg) => {
	notification['success']({
		description: msg,
		duration: 2,
	})
}

export const showErrorMsg = (msg) => {
	notification['error']({
		description: msg,
		duration: 2,
	})
}
