import React from 'react'
import { Row, Col, Typography, Space, Button } from 'antd'

const { Title, Paragraph } = Typography

const Homepage = () => {
	const handleRedirect = (url) => {
		window.location.href = url
	}

	return (
		<>
			<div className='main__container'>
				<Row>
					<Col span={24}>
						<Typography style={{ marginTop: '50px' }}>
							<Title>Welcome to VanHungNguyen's website</Title>
							<Paragraph>
								This site is about user authentication, so there
								won't be any other pages here. If people want to
								see more about how to create other websites, you
								can click on the link below, visit my Github and
								Facebook. Thank you very much!
							</Paragraph>
						</Typography>
						<Space style={{ marginTop: '20px' }}>
							<Button
								type='danger'
								size='large'
								onClick={() =>
									handleRedirect(
										'https://github.com/vanhungnguyenn'
									)
								}
							>
								Github
							</Button>
							<Button
								type='primary'
								size='large'
								onClick={() =>
									handleRedirect(
										'https://www.facebook.com/vanhung.dev'
									)
								}
							>
								Facebook
							</Button>
						</Space>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default Homepage
