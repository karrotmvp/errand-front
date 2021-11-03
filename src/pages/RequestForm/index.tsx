import { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { useNavigator } from "@karrotframe/navigator";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerErrand } from "@api/errands";
import {
  ErrorText,
  SectionTerms,
  SectionWrapper,
  StickyFooter,
  StickyPageWrpper,
  TextAreaWrapper,
} from "@styles/shared";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import useModal from "@hooks/useModal";
import Modal from "@components/Modal";
import ModalInnerBox from "@components/ModalInnerBox";
import Button from "@components/Button";
import ImageBox from "./ImageBox";
import ImageAppender from "./ImageAppender";
import { getValueFromSearch } from "@utils/utils";

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
    formState: { errors },
  } = useForm<Inputs>();
  const { isOpen, openModal, closeModal } = useModal();
  const watchTextArea = watch("detail");
  const { push } = useNavigator();
  const watchImages = watch("images");
  const [imageList, setImageList] = useState<File[]>([]);

  const onSubmit: SubmitHandler<Inputs> = async (result) => {
    const { categoryId, detail, reward, detailAddress, phoneNumber } = result;
    const regionId = getValueFromSearch("region_id") ?? "";
    const formData = new FormData();
    imageList.forEach((file) => {
      console.log(file);
      formData.append("images", file);
    });
    formData.append("categoryId", String(categoryId));
    formData.append("detail", detail);
    formData.append("reward", String(reward));
    formData.append("detailAddress", detailAddress);
    formData.append("phoneNumber", phoneNumber);
    formData.append("regionId", regionId);

    const { id } = await registerErrand(formData);

    closeModal();
    push(`/errands/${id}`);
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

  console.log(1, 2, imageList);
  return (
    <StickyPageWrpper>
      <CustomScreenHelmet title="요청하기" />
      <RequestFormWrapper onSubmit={handleSubmit(onSubmit)} id="errand-form">
        <SectionWrapper>
          <div className="section__title">
            <label>카테고리</label>
            {errors.categoryId && (
              <ErrorText>카테고리를 선택해주세요.</ErrorText>
            )}
          </div>
          <div className="section__content">
            <select {...register("categoryId", { required: true })}>
              <option value="default" disabled>
                카테고리를 선택해주세요.
              </option>
              <option value="1" className="test">
                벌레잡기
              </option>
              <option value="2">반려동물 산책하기</option>
              <option value="3">하나뭐였지</option>
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
            {errors.detail && <ErrorText>세부사항을 입력주세요.</ErrorText>}
          </div>
          <TextAreaWrapper>
            <textarea
              className="section__content"
              placeholder="세부사항을 입력하세요."
              {...register("detail", { required: true })}
            />
            <div>{watchTextArea?.length ?? 0}/500</div>
          </TextAreaWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <label>심부름 금액</label>
            {errors.reward && (
              <ErrorText>심부름 금액을 입력해주세요.</ErrorText>
            )}
          </div>
          <input
            className="section__content"
            placeholder="금액을 입력해주세요."
            type="number"
            {...register("reward", { required: true })}
          />
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <label>요청장소</label>
            {errors.detailAddress && (
              <ErrorText>상세주소를 입력해주세요.</ErrorText>
            )}
          </div>
          <p className="color-grey section__subscribe">
            매칭되었을 때에만 상세주소가 공개돼요.
          </p>
          <div className="section__content">
            <input
              className="section__disabled"
              defaultValue="서현동"
              disabled
            />
            <input
              placeholder="상세주소를 입력해주세요."
              type="text"
              {...register("detailAddress", { required: true })}
            />
          </div>
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <label>전화번호</label>
            {errors.phoneNumber && (
              <ErrorText>전화번호를 입력해주세요.</ErrorText>
            )}
          </div>
          <p className="color-grey section__subscribe">
            매칭되었을 때에만 전화번호가 공개돼요.
          </p>
          <input
            className="section__content"
            placeholder="전화번호를 입력하세요."
            type="number"
            {...register("phoneNumber", { required: true })}
          />
        </SectionWrapper>
      </RequestFormWrapper>
      {isOpen && (
        <Modal onClose={closeModal}>
          <ModalInnerBox
            text={
              "작성완료 후 수정할 수 없어요.\n완료 전 꼼꼼하게 확인해주세요."
            }
            leftText="뒤로가기"
            leftCallback={closeModal}
            rightText={<button form="errand-form">작성완료</button>}
          />
        </Modal>
      )}
      <StickyFooter fullArea>
        <Button
          buttonType="contained"
          color="primary"
          fullWidth
          onClick={openModal}
        >
          작성완료
        </Button>
      </StickyFooter>
    </StickyPageWrpper>
  );
}

const RequestFormWrapper = styled.form`
  padding: 2rem 0;
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
