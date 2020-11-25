import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background-color: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }

  span {
    color: #f4ede8;
  }

  a {
    text-decoration: none;
    color: #ff9000;

    &:hover {
      opacity: 0.8;
    }
  }

  strong {
    color: #ff9000;
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const TypeOfServices = styled.div`
  margin-right: 50px;

  h1 {
    font-size: 36px;
    margin-bottom: 20px;
  }

  input {
    background: #232129;
    border-radius: 10px;
    padding: 16px;
    width: 100%;

    border: 2px solid #232129;
    color: #fff;
  }

  button {
    padding: 0 20px;
    margin-left: 15px;
    background: #ff9000;
    color: #fff;
    border-radius: 10px;

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const WrapperInput = styled.div`
  display: flex;
`;

export const Services = styled.div`
  margin-top: 20px;

  > p {
    margin-bottom: 10px;
  }

  span {
    margin-left: 15px;
    color: #ff9000;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }

  > div {
    display: flex;
    margin-bottom: 15px;
  }
`;

export const WrapperForm = styled.div`
  margin-bottom: 30px !important;
`;
