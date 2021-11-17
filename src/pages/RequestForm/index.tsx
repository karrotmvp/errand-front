import { useCallback, useEffect, useState } from "react";
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
import { getRegion, getValueFromSearch } from "@utils/utils";
import { useRegisterErrand } from "@api/errands";
import { PHONE_NUMBER_REGEX } from "@constant/validation";
import { Dropdown } from "@assets/icon";

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
  const watchCategory = watch("categoryId");
  const watchTextArea = watch("detail");
  const watchImages = watch("images");
  const [imageList, setImageList] = useState<File[]>([]);
  const { replace } = useNavigator();
  const region = getRegion();
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

  const removeImage = useCallback((targetLastModified: number) => {
    setImageList((images) => {
      return images.filter(
        (image) => image.lastModified !== targetLastModified
      );
    });
  }, []);

  useEffect(() => {
    if (watchImages) {
      setImageList(Array.from(watchImages));
    }
  }, [watchImages]);

  return (
    <StickyPageWrpper>
      <CustomScreenHelmet title="요청하기" />
      <RequestFormWrapper onSubmit={handleSubmit(onSubmit)} id="errand-form">
        <SectionWrapper isError={Boolean(errors.categoryId)}>
          <div className="section__title">
            <label>카테고리</label>
            {errors.categoryId && (
              <ErrorText>카테고리를 선택해 주세요.</ErrorText>
            )}
          </div>
          <div className="section__content">
            <div style={{ position: "relative" }}>
              <Dropdown
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "2rem",
                  transform: "translateY(-40%)",
                }}
              />
              <select {...register("categoryId", { required: true })}>
                <option value="" selected disabled>
                  카테고리를 선택해 주세요.
                </option>
                <option value="1">벌레잡기</option>
                <option value="2">반려동물 산책하기</option>
                <option value="3">사다주기</option>
                <option value="4">기타</option>
              </select>
            </div>
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <label>사진첨부</label>
            <span className="color-grey">(선택)</span>
          </div>
          <ImageSlider>
            <ImageAppender len={imageList.length} watchImages={watchImages}>
              <input
                id="input__file"
                type="file"
                max="5"
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
          </ImageSlider>
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <label>세부사항</label>
            {errors.detail && (
              <ErrorText>세부사항을 10자 이상 입력해 주세요.</ErrorText>
            )}
          </div>
          <div className="section__content">
            <TextAreaWrapper
              isError={Boolean(errors.detail)}
              textLength={watchTextArea?.length ?? 0}
            >
              <textarea
                maxLength={500}
                placeholder={
                  watchCategory
                    ? messages[watchCategory].placeholder
                    : "세부사항을 10자 이상 입력해 주세요."
                }
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
        <SectionWrapper isError={Boolean(errors.reward)}>
          <div className="section__title">
            <label>심부름 금액</label>
            {errors.reward && (
              <ErrorText>심부름 금액을 입력해 주세요.</ErrorText>
            )}
          </div>
          {watchCategory && (
            <p className="section__subscribe">
              {messages[watchCategory].price}
            </p>
          )}
          <div className="section__content">
            <input
              placeholder="금액을 입력해 주세요."
              type="number"
              {...register("reward", { required: true })}
            />
          </div>
        </SectionWrapper>
        <SectionWrapper isError={Boolean(errors.detailAddress)}>
          <div className="section__title">
            <label>심부름 장소</label>
            {errors.detailAddress && (
              <ErrorText>심부름 장소를 입력해 주세요.</ErrorText>
            )}
          </div>
          <p className="section__subscribe">
            상세주소는 매칭된 상대에게만 보여요. <br />
            현재는 <span>{region}</span>에서만 심부름을 신청할 수 있어요.
          </p>
          <div className="section__content">
            <input
              placeholder="상세주소를 입력해 주세요."
              type="text"
              {...register("detailAddress", { required: true })}
            />
          </div>
        </SectionWrapper>
        <SectionWrapper isError={Boolean(errors.phoneNumber)}>
          <div className="section__title">
            <label>전화번호</label>
            {errors.phoneNumber && (
              <ErrorText>올바른 전화번호를 입력해 주세요.</ErrorText>
            )}
          </div>
          <p className="color-grey section__subscribe">
            매칭되었을 때에만 전화번호가 공개돼요.
          </p>
          <div className="section__content">
            <input
              placeholder="전화번호를 입력하세요."
              type="number"
              {...register("phoneNumber", {
                required: true,
                pattern: PHONE_NUMBER_REGEX,
              })}
            />
          </div>
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

const ImageSlider = styled.div`
  display: flex;
  align-items: flex-end;
  height: 8.2rem;
  overflow-x: scroll;

  & > * + * {
    margin-left: 1rem;
  }
`;

type Message = {
  name: string;
  price: React.ReactNode;
  placeholder: string;
};

const messages: { [key: number]: Message } = {
  1: {
    name: "벌레잡기",
    price: (
      <div>
        벌레잡기는 평균 <span>5천원 ~ 만원</span>으로 책정되고 있어요.
      </div>
    ),
    placeholder:
      "벌레의 종, 현재 상황 등을 구체적으로 적어주시면 더 빠른 매칭이 이루어질 수 있어요.",
  },
  2: {
    name: "반려동물 산책하기",
    price: (
      <div>
        반려동물 산책하기는 <span>자유로운 금액</span>으로 책정되고 있어요.
      </div>
    ),
    placeholder:
      "반려동물의 종, 성격 등을 구체적으로 적어주시면 더 빠른 매칭이 이루어질 수 있어요.",
  },
  3: {
    name: "사다주기",
    price: (
      <div>
        사다주기는 <span>물건금액을 제외하여</span> 책정되고 있어요.
      </div>
    ),
    placeholder:
      "필요한 물건이 무엇인지 등을 구체적으로 적어주시면 더 빠른 매칭이 이루어질 수 있어요.",
  },
  4: {
    name: "기타",
    price: "",
    placeholder:
      "예) 창문 닫기, 전등 달기, 전자제품 끄기, 못 박기, 직접수령 부탁하기 등 필요한 도움을 상세히 적어주시면 더 빠른 매칭이 이루어질 수 있어요.",
  },
};
