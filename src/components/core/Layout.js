import { styled } from '@linaria/react'

export const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	padding: 0px 16px;

	margin-left: auto;
	margin-right: auto;
`

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	padding: 16px;
	max-width: 600px;

	align-items: stretch;
	margin-left: auto;
	margin-right: auto;
	margin-top: 16px;
	margin-bottom: 16px;
	background: #fff;
	border-radius: 8px;
`
