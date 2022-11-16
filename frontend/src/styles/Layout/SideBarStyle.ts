import styled from 'styled-components';
export const MenuItems = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 1vw;
  margin-left: 1.5vw;
  width: 11.5vw;
  height: 10vh;
  /* border: 1px black solid; */
  background-color: #111111;
  position: relative;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  color: white;
  &:hover {
    background-color: #dfecf9;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
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
    box-shadow: 0px 7px 0 0px #dfecf9;
  }

  &:hover::after {
    content: '';
    position: absolute;
    z-index: 10;
    width: 15px;
    height: 15px;
    /* background-color: yellow; */
    border-top-right-radius: 10px;
    top: 8vh;
    right: 0px;
    box-shadow: 0px -7px 0 0px #dfecf9;
  }
  .icon {
    /* margin-left: 0.5vw; */
  }
  .title {
    font-size: 2.5vmin;
    margin-left: 0.3vw;
  }
  &.clicked {
    color: #111111;
    background-color: #dfecf9;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
  &.clicked::before {
    content: '';
    position: absolute;
    /* z-index: 10; */
    width: 15px;
    height: 15px;
    background-color: transparent;

    border-bottom-right-radius: 10px;
    top: -15px;
    right: 0px;
    box-shadow: 0px 7px 0 0px #dfecf9;
  }

  &.clicked::after {
    content: '';
    position: absolute;
    z-index: 10;
    width: 15px;
    height: 15px;
    /* background-color: yellow; */
    border-top-right-radius: 10px;
    top: 8vh;
    right: 0px;
    box-shadow: 0px -7px 0 0px #dfecf9;
  }
`;