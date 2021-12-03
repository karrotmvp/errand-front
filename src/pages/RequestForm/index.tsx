import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigator } from "@karrotframe/navigator";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ErrorText,
  PriceInput,
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
import { Dropdown } from "@assets/icon";
import CustomMixPanel from "@utils/mixpanel";
import { toast } from "@components/Toast/Index";
import { uploadImage } from "@utils/uploadImage";

type Inputs = {
  categoryId: number;
  images?: File[];
  detail: string;
  reward: number;
  phoneNumber: string;
};

type RequestFormProps = {
  categoryId?: string;
  reward?: string;
  detail?: string;
  image?: string;
};
export default function RequestForm({
  categoryId = "0",
  reward,
  detail = "",
}: RequestFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    defaultValues: {
      categoryId: Number(categoryId),
      reward: Number(reward),
      detail,
    },
  });
  const { isOpen, openModal, closeModal, innerMode } = useModal();
  const watchCategory = watch("categoryId");
  const watchTextArea = watch("detail");
  const watchImages = watch("images");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const { replace } = useNavigator();
  const mutationRegisterErrand = useRegisterErrand({
    onSuccess: (id: string) => {
      closeModal();
      replace(`/errands/${id}`);
      toast("요청이 완료되었어요");
    },
  });
  const modalInfo: ModalInfoType = {
    confirm: {
      text: "작성 완료 후 수정할 수 없어요.\n완료 전 꼼꼼하게 확인해 주세요.",
      no: (
        <button
          onClick={() => {
            CustomMixPanel.track(CustomMixPanel.eventName.clickNoConfirm, {
              page: "요청하기",
              confirm: "요청하기",
            });
            closeModal();
          }}
        >
          뒤로가기
        </button>
      ),
      yes: <button form="errand-form">작성완료</button>,
    },
  };

  const onSubmit: SubmitHandler<Inputs> = async (result) => {
    const { categoryId, detail, reward, phoneNumber } = result;
    const regionId = getValueFromSearch("region_id") ?? "";
    const formData = new FormData();
    // 굳이 formData일 필요가 없다?
    imageUrls.forEach((URL) => {
      formData.append("images", URL);
    });
    formData.append("categoryId", String(categoryId));
    formData.append("detail", detail);
    formData.append("reward", String(reward));
    formData.append("phoneNumber", phoneNumber);
    formData.append("regionId", regionId);

    mutationRegisterErrand.mutate(formData);
  };

  const removeImage = useCallback((targetIndex: number) => {
    setImageUrls((URLs) => {
      return URLs.filter((_, index) => index !== targetIndex);
    });
  }, []);

  const uploadImages = async (files: File[]) => {
    setIsUploadingImage(true);
    const responsedURLs = await Promise.all(
      files.map((file) => uploadImage(file))
    );
    setIsUploadingImage(false);
    setImageUrls((URLs) => [...URLs, ...responsedURLs]);
  };

  useEffect(() => {
    if (!watchImages) return;

    if (watchImages.length > 10 || watchImages.length + imageUrls.length > 10) {
      toast("이미지는 10개 이상 추가할 수 없어요!");
      return;
    }
    uploadImages(Array.from(watchImages));

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <select
                onClick={() => {
                  CustomMixPanel.track(CustomMixPanel.eventName.clickInput, {
                    page: "요청하기",
                    clickTarget: "카테고리",
                  });
                }}
                {...register("categoryId", { required: true })}
              >
                <option value="0" disabled>
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
            <label>심부름 금액</label>
            {errors.reward && (
              <ErrorText>심부름 금액을 입력해 주세요.</ErrorText>
            )}
          </div>
          {watchCategory ? (
            <p className="section__subscribe">
              {messages[watchCategory].price}
            </p>
          ) : (
            ""
          )}
          <div className="section__content">
            <PriceInput isError={Boolean(errors.reward)}>
              <input
                className="price"
                placeholder="심부름 금액을 입력해 주세요."
                type="number"
                inputMode="decimal"
                onClick={() => {
                  CustomMixPanel.track(CustomMixPanel.eventName.clickInput, {
                    page: "요청하기",
                    clickTarget: "심부름 금액",
                  });
                }}
                {...register("reward", { required: true })}
              />
            </PriceInput>
          </div>
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
                onClick={() => {
                  CustomMixPanel.track(CustomMixPanel.eventName.clickInput, {
                    page: "요청하기",
                    clickTarget: "세부사항",
                  });
                }}
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
            <label>사진첨부</label>
            <span className="color-grey">(선택)</span>
          </div>
          <ImageSlider>
            <ImageAppender
              len={imageUrls.length}
              isUploadingImage={isUploadingImage}
            >
              <input
                id="input__file"
                type="file"
                multiple
                {...register("images")}
              />
            </ImageAppender>
            {imageUrls &&
              imageUrls.map((URL, index) => (
                <ImageBox {...{ URL, removeImage, index }} key={URL} />
              ))}
          </ImageSlider>
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
              inputMode="decimal"
              onClick={() => {
                CustomMixPanel.track(CustomMixPanel.eventName.clickInput, {
                  page: "요청하기",
                  clickTarget: "전화번호",
                });
              }}
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
          disabled={!isValid || isUploadingImage}
          padding="1.8rem 0"
          onClick={() => {
            openModal("confirm");
            CustomMixPanel.track(CustomMixPanel.eventName.clickCTA, {
              page: "요청하기",
              clickTarget: "심부름 요청하기",
            });
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
  0: {
    name: "카테고리를 선택해주세요.",
    price: <div></div>,
    placeholder: "세부사항을 10자 이상 입력해 주세요.",
  },
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
