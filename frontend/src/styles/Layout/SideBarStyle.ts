import styled from 'styled-components';
export const MenuItems = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 1vw;
  width: 13vw;
  height: 10vh;
  /* border: 1px black solid; */
  background-color: skyblue;
  position: relative;
  &:hover {
    background-color: #dde9f7;
  }
  &:hover::before {
    content: '';
    position: absolute;
    /* z-index: 10; */
    width: 15px;
    height: 15px;
    background-color: transparent;
    border-bottom-right-radius: 10px;
    top: -15px;
    right: 0px;
    box-shadow: 0px 7px 0 0px #dde9f7;
  }

  &:hover::after {
    content: '';
    position: absolute;
    z-index: 10;
    width: 15px;
    height: 15px;
    /* background-color: yellow; */
    border-top-right-radius: 10px;
    top: 10vh;
    right: 0px;
    box-shadow: 0px -7px 0 0px #dde9f7;
  }
`;
