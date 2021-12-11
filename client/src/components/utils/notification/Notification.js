import { notification } from 'antd'

export const showSuccessMsg = (msg) => {
	notification['success']({
		description: msg,
		duration: 3,
		style: {
			minWidth: 450,
			width: '90%',
		},
	})
}

export const showErrorMsg = (msg) => {
	notification['error']({
		description: msg,
		duration: 2,
		style: {
			minWidth: 450,
			width: '90%',
		},
	})
}
