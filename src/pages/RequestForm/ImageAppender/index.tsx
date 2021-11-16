import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { BoxWrapper } from "../ImageBox";
import { Loader, Plus } from "@assets/icon";

interface ImageAppenderProps {
  len: number;
  children: React.ReactNode;
  watchImages: File[] | undefined;
}

export default function ImageAppender({
  children,
  len,
  watchImages,
}: ImageAppenderProps) {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    setIsUploading(false);
  }, [watchImages]);

  return (
    <ImageAppenderWrapper
      onClick={() => {
        setIsUploading(true);
      }}
    >
      <label htmlFor="input__file">
        {isUploading ? (
          <Loader
            className="appender__loader"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsUploading(false);
            }}
          />
        ) : (
          <>
            <Plus className="appender__plus" />
            <span>{len} / 10</span>
          </>
        )}
      </label>
      {children}
    </ImageAppenderWrapper>
  );
}

const ImageAppenderWrapper = styled(BoxWrapper)`
  border: 0.1rem solid ${({ theme }) => theme.color.grey6};
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
