import React, { useState } from 'react';

const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const onClickModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return {
    isOpenModal,
    onClickModal,
  };
};

export default useModal;
