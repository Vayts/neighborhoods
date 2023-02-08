import styled from 'styled-components';

export const DebtorsTableWrapper = styled.div`
	display: flex;
	flex-direction: column;
  position: relative;
`;

export const DebtorsTableList = styled.table`
  border-collapse: collapse;
	border-spacing: 0;
  table-layout: fixed;
	width: 100%;
	
	li:first-child {
		margin-top: 0;
	}
	
`;
