import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigator } from "@karrotframe/navigator";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ErrorText,
  SectionWrapper,
  StickyFooter,
  StickyPageWrpper,
  TextAreaWrapper,
} from "@styles/shared";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import useModal from "@hooks/useModal";
import Modal, { ModalInfoType } from "@components/Modal";

import Button from "@components/Button";
import ImageBox from "./ImageBox";
import ImageAppender from "./ImageAppender";
import { getValueFromSearch } from "@utils/utils";
import { useRegisterErrand } from "@api/errands";
import { PHONE_NUMBER_REGEX } from "@constant/validation";

type Inputs = {
  categoryId: number;
  images?: File[];
  detail: string;
  reward: number;
  detailAddress: string;
  phoneNumber: string;
};

export default function RequestForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const { isOpen, openModal, closeModal, innerMode } = useModal();
  const watchTextArea = watch("detail");
  const watchImages = watch("images");
  const [imageList, setImageList] = useState<File[]>([]);
  const { replace } = useNavigator();

  const mutationRegisterErrand = useRegisterErrand({
    onSuccess: (id: string) => {
      closeModal();
      replace(`/errands/${id}`);
    },
  });

  const modalInfo: ModalInfoType = {
    confirm: {
      text: "작성 완료 후 수정할 수 없어요.\n완료 전 꼼곰하게 확인해 주세요.",
      no: <button onClick={closeModal}>뒤로가기</button>,
      yes: <button form="errand-form">작성완료</button>,
    },
  };

  const onSubmit: SubmitHandler<Inputs> = async (result) => {
    const { categoryId, detail, reward, detailAddress, phoneNumber } = result;
    const regionId = getValueFromSearch("region_id") ?? "";
    const formData = new FormData();
    imageList.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("categoryId", String(categoryId));
    formData.append("detail", detail);
    formData.append("reward", String(reward));
    formData.append("detailAddress", detailAddress);
    formData.append("phoneNumber", phoneNumber);
    formData.append("regionId", regionId);
    mutationRegisterErrand.mutate(formData);
  };

  const removeImage = (targetLastModified: number) => {
    setImageList((images) => {
      return images.filter(
        (image) => image.lastModified !== targetLastModified
      );
    });
  };

  useEffect(() => {
    if (watchImages) {
      setImageList(Array.from(watchImages));
    }
  }, [watchImages]);

  return (
    <StickyPageWrpper>
      <CustomScreenHelmet title="요청하기" />
      <RequestFormWrapper onSubmit={handleSubmit(onSubmit)} id="errand-form">
        <SectionWrapper>
          <div className="section__title">
            <label>카테고리</label>
            {errors.categoryId && (
              <ErrorText>카테고리를 선택해 주세요.</ErrorText>
            )}
          </div>
          <div className="section__content">
            {/* TODO 우측 드롭다운 화살표 패딩 옮기기  */}
            <select
              {...register("categoryId", { required: true })}
              style={{ paddingRight: "5rem" }}
            >
              <option value="" selected disabled>
                카테고리를 선택해 주세요.
              </option>
              <option value="1">벌레잡기</option>
              <option value="2">반려동물 산책하기</option>
              <option value="3">사다주기</option>
              <option value="4">기타</option>
            </select>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <label>사진첨부</label>
            <span className="color-grey">(선택)</span>
          </div>
          <ImageCarousel>
            <ImageAppender>
              <input
                id="input__file"
                type="file"
                multiple
                {...register("images")}
              />
            </ImageAppender>
            {imageList &&
              imageList.map((file) => (
                <ImageBox
                  file={file}
                  removeImage={removeImage}
                  key={file.lastModified}
                />
              ))}
          </ImageCarousel>
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <label>세부사항</label>
            {errors.detail && (
              <ErrorText>세부사항을 10자 이상 입력해 주세요.</ErrorText>
            )}
          </div>
          <div className="section__content">
            <TextAreaWrapper>
              <textarea
                placeholder="세부사항을 10자 이상 입력해 주세요."
                {...register("detail", {
                  required: true,
                  minLength: 10,
                  maxLength: 500,
                })}
              />
              <div>{watchTextArea?.length ?? 0}/500</div>
            </TextAreaWrapper>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <label>심부름 금액</label>
            {errors.reward && (
              <ErrorText>심부름 금액을 입력해 주세요.</ErrorText>
            )}
          </div>
          <input
            className="section__content"
            placeholder="금액을 입력해 주세요."
            type="number"
            {...register("reward", { required: true })}
          />
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <label>심부름 장소</label>
            {errors.detailAddress && (
              <ErrorText>심부름 장소를 입력해 주세요.</ErrorText>
            )}
          </div>
          <p className="color-grey section__subscribe">
            상세주소는 매칭된 상대에게만 보여요. <br />
            현재는 <span>서현동</span>에서만 심부름을 신청할 수 있어요.
          </p>
          <div className="section__content">
            <input
              placeholder="상세주소를 입력해 주세요."
              type="text"
              {...register("detailAddress", { required: true })}
            />
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <label>전화번호</label>
            {errors.phoneNumber && (
              <ErrorText>올바른 전화번호를 입력해 주세요.</ErrorText>
            )}
          </div>
          <p className="color-grey section__subscribe">
            매칭되었을 때에만 전화번호가 공개돼요.
          </p>
          <input
            className="section__content"
            placeholder="전화번호를 입력하세요."
            type="number"
            {...register("phoneNumber", {
              required: true,
              pattern: PHONE_NUMBER_REGEX,
            })}
          />
        </SectionWrapper>
      </RequestFormWrapper>
      {isOpen && innerMode && (
        <Modal {...{ closeModal, modalInfo, innerMode }} />
      )}
      <StickyFooter fullArea>
        <Button
          buttonType="contained"
          color="primary"
          fullWidth
          disabled={!isValid}
          padding="1.7rem 0 4rem 0"
          onClick={() => {
            openModal("confirm");
          }}
        >
          심부름 요청하기
        </Button>
      </StickyFooter>
    </StickyPageWrpper>
  );
}

const RequestFormWrapper = styled.form`
  padding: 3rem 0;
  ${({ theme }) => theme.container}
`;

const ImageCarousel = styled.div`
  display: flex;
  align-items: flex-end;
  height: 8.2rem;
  overflow-x: scroll;

  & > * + * {
    margin-left: 1rem;
  }
`;
