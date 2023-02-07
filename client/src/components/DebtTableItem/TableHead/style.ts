import styled from 'styled-components';

export const TableHeadWrapper = styled.tr`
  width: 100%;
	background-color: #fff;

  td {
	  vertical-align: middle;
	  height: 40px;
	  color: ${({ theme }) => theme.subTxtColor};
	  font-size: 14px;
	  padding: 0 10px;
    border: 1px solid #f1f1f1;
	  
    &:first-child {
	    padding-left: 40px;
      width: 20%;
    }
    &:nth-child(2) {
      width: 40%;
    }
    &:nth-child(3) {
      width: 10%;
    }
    &:nth-child(4) {
      width: 15%;
    }
    &:nth-child(5) {
      width: 10%;
    }
    &:nth-child(6) {

    }
  }
`;
