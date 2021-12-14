export const columns = [
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
		dataIndex: 'admin',
		key: 'admin',
		render: (boolean) => (boolean ? 'True' : 'False'),
	},
	{
		title: 'Action',
		dataIndex: 'action',
		key: 'action',
	},
]

export const dataTable = [
	{
		key: 1,
		name: 'Hoebart McAdam',
		email: 'hmcadam0@unblog.fr',
		admin: true,
	},
	{
		key: 2,
		name: 'Udale Sebire',
		email: 'usebire1@e-recht24.de',
		admin: false,
	},
	{
		key: 3,
		name: 'Thorpe Giral',
		email: 'tgiral2@wix.com',
		admin: false,
	},
	{
		key: 4,
		name: 'Glyn Maric',
		email: 'gmaric3@webs.com',
		admin: false,
	},
	{
		key: 5,
		name: 'Fabian Starkie',
		email: 'fstarkie4@webeden.co.uk',
		admin: false,
	},
]
