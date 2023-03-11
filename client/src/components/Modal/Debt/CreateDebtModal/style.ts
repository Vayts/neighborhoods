import styled from 'styled-components';

export const CreateDebtWrapper = styled.div`
	min-width: 420px;
	padding: 0 20px 10px;
	
	h3 {
		text-align: center;
	}
`;

export const CreateDebtSubTitleWrapper = styled.div`
  display: flex;
	align-items: center;
  justify-content: center;
	color: ${({ theme }) => theme.subTxtColor};
	margin-bottom: 15px;
	
	h3 {
		font-weight: 400;
	}
`;

export const CreateDebtIcon = styled.span`
	font-size: 20px;
	margin-right: 5px;
`;

export const CreateDebtForm = styled.form`

`;
