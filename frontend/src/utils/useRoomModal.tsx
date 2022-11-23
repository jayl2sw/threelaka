import React, { useState } from 'react';

const useRoomModal = () => {
  const [isOpenRoomModal, setIsOpenRoomModal] = useState(false);

  const onClickRoomModal = () => {
    setIsOpenRoomModal(!isOpenRoomModal);
  };

  return {
    isOpenRoomModal,
    onClickRoomModal,
  };
};

export default useRoomModal;
