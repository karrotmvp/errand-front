import React from "react";
import styled from "@emotion/styled";
import { BoxWrapper } from "../ImageBox";
import { Loader, Plus } from "@assets/icon";
import CustomMixPanel from "@utils/mixpanel";

interface ImageAppenderProps {
  len: number;
  children: React.ReactNode;
  isUploadingImage: boolean;
}

export default function ImageAppender({
  children,
  len,
  isUploadingImage,
}: ImageAppenderProps) {
  return (
    <ImageAppenderWrapper>
      <label htmlFor="input__file">
        {isUploadingImage ? (
          <Loader
            width={50}
            height={50}
            fill="#DCDCDC"
            className="appender__loader"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        ) : (
          <>
            <Plus
              className="appender__plus"
              onClick={() => {
                CustomMixPanel.track("사진첨부 Input 클릭", {
                  page: "요청하기",
                  clickTarget: "사진 추가",
                });
              }}
            />
            <span>{len} / 10</span>
          </>
        )}
      </label>
      {children}
    </ImageAppenderWrapper>
  );
}

const ImageAppenderWrapper = styled(BoxWrapper)`
  border: 0.12rem solid ${({ theme }) => theme.color.grey6};
  width: 7rem;
  height: 7rem;
  & > label {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > svg {
      stroke: ${({ theme }) => theme.color.grey6};
    }
    & > .appender__loader {
      width: 100%;
      height: 100%;
    }
    & > .appender__plus {
      margin-bottom: 0.5rem;
    }
    & > span {
      ${({ theme }) => theme.font("xsmall")};
      color: ${({ theme }) => theme.color.grey6};
    }
  }
`;
