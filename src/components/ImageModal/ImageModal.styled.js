import styled from "styled-components";

export const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    & > svg > path {
      fill: #3093C2;
    }
  }
`;


export const CloseBtnWrap = styled.div`
  display: flex;
  justify-content: right;
padding-bottom: 9px;
 
`;