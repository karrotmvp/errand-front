import { innerModeType } from "@components/Modal";
import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [innerMode, setInnerMode] = useState<innerModeType | null>(null);

  const openModal = (mode: innerModeType) => {
    setIsOpen(true);
    if (innerMode !== mode) {
      setInnerMode(mode);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal, innerMode };
};

export default useModal;
