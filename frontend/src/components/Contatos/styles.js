import styled from "styled-components";

export const BtnAcao = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  button {
    background: transparent !important;
    margin-right: 15px;
    border: none;
    outline: none;
    transition: 0.5s;
    :hover {
      color: #d1d1d1;
    }
  }
`;

export const HeaderModal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

export const Phone = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  svg {
    margin-right: 10px;
  }
`;
