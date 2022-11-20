import React, { useState } from 'react';
import MainVideoHeader from './MainVideoHeader';
import { Outlet } from 'react-router-dom';
import VideoModal from '../utils/VideoModal';
import styled from 'styled-components';

const MainVideoLayout = () => {
  const [modalToggleVideoId, setModalToggleVideoId] = useState<string>('none');

  return (
    <>
      <VideoModal
        modalStyleNum={1}
        modalToggleVideoId={modalToggleVideoId}
        setModalToggleVideoId={setModalToggleVideoId}
      ></VideoModal>
      <MainVideoHeader
        setModalToggleVideoId={setModalToggleVideoId}
      ></MainVideoHeader>

      <Outlet />
    </>
  );
};

export default MainVideoLayout;
