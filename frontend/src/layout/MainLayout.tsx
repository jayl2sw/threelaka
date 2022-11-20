import React, { useState } from 'react';
import MainHeader from './MainHeader';
import { Outlet } from 'react-router-dom';
import VideoModal from '../utils/VideoModal';

const MainLayout = () => {
  const [modalToggleVideoId, setModalToggleVideoId] = useState<string>('none');

  return (
    <div className="main-style">
      <VideoModal
        modalStyleNum={1}
        modalToggleVideoId={modalToggleVideoId}
        setModalToggleVideoId={setModalToggleVideoId}
      ></VideoModal>
      <MainHeader setModalToggleVideoId={setModalToggleVideoId}></MainHeader>

      <Outlet />
    </div>
  );
};

export default MainLayout;
