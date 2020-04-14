import styled from "styled-components";

export const ContentRegister = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  .card {
    width: 25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo-register {
      display: flex;
      flex-direction: row;
      padding: 15px;
      span h3 {
        margin-left: 10px;
        font-weight: 700;
      }
    }

    form input {
      margin-bottom: 10px;
    }
    a {
      text-decoration: none;
      font-weight: 500;
      font-size: 16px;
      transition: 0.5s;

      :hover {
        color: #900;
      }
    }
  }
`;
