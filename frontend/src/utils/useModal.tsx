import React, { useState } from 'react';

const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onClickModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return {
    isOpenModal,
    onClickModal,
  };
};

export default useModal;
