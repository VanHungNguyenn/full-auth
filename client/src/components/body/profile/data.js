import { Button, Space, Tooltip } from 'antd'
import { Link } from 'react-router-dom'

export const columns = [
	{
		title: 'Id',
		dataIndex: '_id',
		key: '_id',
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'Admin',
		dataIndex: 'role',
		key: 'role',
		render: (boolean) => (boolean ? 'True' : 'False'),
	},
	{
		title: 'Action',
		dataIndex: 'action',
		key: 'action',
		render: (text, record, i) => (
			<Space>
				<Tooltip title='Edit'>
					<Button type='primary'>
						<Link to={`/edit_user/${record._id}`}>
							<i className='fas fa-edit'></i>
						</Link>
					</Button>
				</Tooltip>
				<Tooltip title='Delete'>
					<Button type='danger'>
						<Link to={`/delete_user/${record._id}`}>
							<i className='fas fa-trash'></i>
						</Link>
					</Button>
				</Tooltip>
			</Space>
		),
	},
]

// export const dataTable = [
// 	{
// 		key: 1,
// 		id: 'fjaksljt',
// 		name: 'Hoebart McAdam',
// 		email: 'hmcadam0@unblog.fr',
// 		admin: true,
// 	},
// 	{
// 		key: 2,
// 		id: 'fjaksdfs',
// 		name: 'Udale Sebire',
// 		email: 'usebire1@e-recht24.de',
// 		admin: false,
// 	},
// 	{
// 		key: 3,
// 		id: 'fjaksfs',
// 		name: 'Thorpe Giral',
// 		email: 'tgiral2@wix.com',
// 		admin: false,
// 	},
// 	{
// 		key: 4,
// 		id: 'fsdfsljt',
// 		name: 'Glyn Maric',
// 		email: 'gmaric3@webs.com',
// 		admin: false,
// 	},
// 	{
// 		key: 5,
// 		id: 'fjasfsljt',
// 		name: 'Fabian Starkie',
// 		email: 'fstarkie4@webeden.co.uk',
// 		admin: false,
// 	},
// ]
