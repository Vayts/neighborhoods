import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const RegisterPageWrapper = styled.div`
	min-height: 100vh;
  display: flex;
  justify-content: center;
	align-items: center;
`;

export const RegisterLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
	margin-bottom: 30px;
  border-radius: 10px;
`;

export const RegisterLogo = styled.img`
	width: 170px;
`;

export const RegisterTitleWrapper = styled.div`
	margin-bottom: 50px;
`;

export const RegisterTitle = styled.h2`
  font-size: 19px;
	margin: 20px 0 10px;
	text-align: center;
`;

export const RegisterSubTitle = styled.p`
	color: #829AB1;
  text-align: center;
	margin: 0;
	font-size: 14px;
`;

export const RegisterContentHolder = styled.div`
	background-color: #fff;
	padding: 30px 40px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
`;

export const RegisterForm = styled.form`

`;

export const RegisterFormDivider = styled.div`
	display: flex;
	justify-content: space-between;
	
	& > div {
		&:first-child {
			margin-right: 25px;
		}
	}
`;

export const RegisterSubDivider = styled.div``;

export const RegisterFormLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
	margin-top: 15px;
`;

export const RegisterFormLinkText = styled.p`
	color: #829AB1;;
  font-weight: 400;
  font-size: 13px;
	margin: 0 5px 0 0;

`;

export const RegisterFormLinkItem = styled(Link)`
	color: ${({ theme }) => theme.linkColor};
  font-weight: 700;
  font-size: 13px;
`;
