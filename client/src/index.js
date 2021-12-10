import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'

import './index.css'
import App from './App'

import DataProvider from './redux/store'

ReactDOM.render(
	<DataProvider>
		<App />
	</DataProvider>,
	document.getElementById('root')
)
