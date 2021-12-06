import { useState } from "react";

const useImageViewer = () => {
  const [isOpenImageViewer, setIsOpenImageViewer] = useState<boolean>(false);
  const [initialSlideIndex, setInitialSlideIndex] = useState<number>(0);

  const openImageViewer = (index: number = 0) => {
    setIsOpenImageViewer(true);
    if (index) {
      setInitialSlideIndex(index);
    }
  };
  const closeImageViewer = () => {
    setIsOpenImageViewer(false);
  };

  return {
    isOpenImageViewer,
    openImageViewer,
    closeImageViewer,
    initialSlideIndex,
  };
};

export default useImageViewer;
