import React from "react";
import styled from "@emotion/styled";
import Slider from "react-slick";
import { Image } from "@type/response";
import Portal from "@components/Portal";
import useBack from "@hooks/useBack";
import { Close } from "@assets/icon";

type ImageViewerProps = {
  items: Image[];
  closeImageViewer: () => void;
  initialSlideIndex?: number;
};

export default function ImageViewer({
  items,
  initialSlideIndex = 0,
  closeImageViewer,
}: ImageViewerProps) {
  useBack(closeImageViewer, false);

  return (
    <Portal target="viewer-root">
      <ImageViewerWrapper>
        <div className="image-viewer">
          <div className="image-viewer__header">
            <div>
              <Close stroke="white" onClick={closeImageViewer} />
            </div>
          </div>
          <div className="image-viewer__body">
            <Slider
              {...{
                dots: true,
                infinite: true,
                speed: 500,
                dotsClass: "slider__dots",
                initialSlideIndex,
              }}
            >
              {items.map((image) => (
                <div>
                  <ImageWrapper key={image.id}>
                    <img src={image.url} alt="item" />
                  </ImageWrapper>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </ImageViewerWrapper>
    </Portal>
  );
}

const ImageViewerWrapper = styled.div`
  background: black;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;

  .image-viewer {
    width: 100%;
    height: 100%;
    &__header {
      width: 100%;
      padding: 2rem;
      padding-right: 1rem;
      position: fixed;
      top: 0;
      z-index: 1001;
      display: flex;
      justify-content: flex-end;

      & > div {
        padding: 1rem;
      }
    }
    &__body {
      overflow: hidden;
      height: 100%;
      & > div {
        height: 100%;
        & > .slick-list {
          height: 100%;
          & > .slick-track {
            height: 100%;
            & > div {
              height: 100%;
              & > div {
                height: 100%;
                & > div {
                  height: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ImageWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  & > img {
    width: 100%;
  }
`;
