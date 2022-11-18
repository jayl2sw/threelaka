import { useState } from 'react';

export const useRoomModal = () => {
  const [isOpenRoomModal, setIsOpenRoomModal] = useState(false);

  const onClickRoomModal = () => {
    setIsOpenRoomModal(!isOpenRoomModal);
  };

  return {
    isOpenRoomModal,
    onClickRoomModal,
  };
};

export const useOverlay = () => {
  const [Overlay, setOverlay] = useState(true);

  const showOverlay = (data: any) => {
    setOverlay(data);
  };

  return {
    Overlay,
    showOverlay,
  };
};
