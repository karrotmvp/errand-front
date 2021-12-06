import { Close } from "@assets/icon";
import styled from "@emotion/styled";
import { memo } from "react";

type ImageBoxProps = {
  URL: string;
  index: number;
  removeImage: (id: number) => void;
};
export default memo(function ImageBox({
  URL,
  removeImage,
  index,
}: ImageBoxProps) {
  return (
    <ImageBoxWrapper imgURL={URL}>
      <div className="image__remover">
        <Close stroke="white" onClick={() => removeImage(index)} />
      </div>
    </ImageBoxWrapper>
  );
});

export const BoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  min-width: 7rem;
  min-height: 7rem;
  width: 7rem;
  height: 7rem;
`;

const ImageBoxWrapper = styled(BoxWrapper)<{ imgURL: string }>`
  background: no-repeat ${({ imgURL }) => `url(${imgURL})`};
  background-size: cover;
  position: relative;

  & > .image__remover {
    position: absolute;
    top: 0;
    right: 0;
    width: 2.2rem;
    height: 2.2rem;
    background: rgba(51, 51, 51, 0.7);
    border-radius: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;

    transform: translate(50%, -50%);
  }
`;
