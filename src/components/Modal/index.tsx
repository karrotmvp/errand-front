import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ModalConfirmInner from "./ModalConfirmInner.tsx";
import ModalListInner from "./ModalListInner";
import ModalInnerBox from "./ModalInnerBox";
import useBack from "@hooks/useBack";
import Portal from "@components/Portal";

export type Confirm = {
  text: React.ReactNode;
  no: React.ReactNode;
  yes: React.ReactNode;
};

export type Content = {
  text: React.ReactNode;
  confirm?: Confirm;
};

export type ModalInfoType = {
  list?: Content[];
  confirm?: Confirm;
};

export type innerModeType = "list" | "confirm";

type ModalProps = {
  closeModal: any;
  modalInfo: ModalInfoType;
  innerMode: innerModeType;
};

export default function Modal({
  closeModal,
  modalInfo: { list, confirm },
  innerMode: initialMode,
}: ModalProps) {
  const [innerMode, setInnerMode] = useState<innerModeType>(initialMode);
  const [confirmContent, setConfirmContent] = useState<Confirm | null>(() => {
    return confirm ?? null;
  });

  const openConfirmModal = (content: Confirm) => {
    setInnerMode("confirm");
    setConfirmContent(content);
  };

  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);
  useBack(closeModal);
  return (
    <Portal target="modal-root">
      <ModalOverlay />
      <ModalInnerBox innerMode={innerMode} closeModal={closeModal}>
        {innerMode === "list" && list ? (
          <ModalListInner
            {...{
              list,
              closeModal,
              openConfirmModal,
            }}
          />
        ) : (
          confirmContent && (
            <ModalConfirmInner {...{ confirmContent, closeModal }} />
          )
        )}
      </ModalInnerBox>
    </Portal>
  );
}

const ModalOverlay = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;
