import { useEffect } from "react";
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
} from "@styles/shared";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import useModal from "@hooks/useModal";
import Modal from "@components/Modal";
import ModalInnerBox from "@components/ModalInnerBox";
import Button from "@components/Button";
import { DEFAULT_IMAGE } from "@constant/default";
import ImageBox from "./ImageBox";
import ImageAppender from "./ImageAppender";

type Inputs = {
  categoryId: number;
  images: File[];
  title: string;
  detail: string;
  reward: number;
  detailAddress: string;
  phoneNumber: string;
  termAll: boolean;
  term1: boolean;
  term2: boolean;
};

const DUMMY_IMAGES = [
  DEFAULT_IMAGE,
  DEFAULT_IMAGE,
  DEFAULT_IMAGE,
  DEFAULT_IMAGE,
  DEFAULT_IMAGE,
];

export default function RequestForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();
  const { isOpen, openModal, closeModal } = useModal();
  const watchTermAll = watch("termAll", false);
  const isAll = watch(["term1", "term2"]).every((el) => el);
  const { push } = useNavigator();

  const onSubmit: SubmitHandler<Inputs> = async (result) => {
    const {
      categoryId,
      title,
      detail,
      reward,
      detailAddress,
      phoneNumber,
      images,
    } = result;
    console.log(images);
    const { id } = await registerErrand({
      imageUrls: ["", ""],
      categoryId,
      title,
      detail,
      reward,
      detailAddress,
      phoneNumber,
      regionId: "1234",
    });
    //TODO : 새글 등록 요청 하고 그 글의 id를 전달받아서 push
    closeModal();
    push(`/errands/${id}`);
  };

  useEffect(() => {
    const termAll = getValues("termAll");

    if (isAll !== termAll) {
      setValue("term1", termAll);
      setValue("term2", termAll);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTermAll, setValue, getValues]);

  useEffect(() => {
    if (getValues("termAll") !== isAll) {
      setValue("termAll", isAll);
    }
  }, [isAll, setValue, getValues]);

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
              <option value="null" disabled selected>
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
            {DUMMY_IMAGES.map((imgURL) => (
              <ImageBox imgURL={imgURL} />
            ))}
          </ImageCarousel>
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <label>요청제목</label>
            {errors.title && <ErrorText>제목을 입력해주세요.</ErrorText>}
          </div>
          <input
            className="section__content"
            placeholder="제목을 입력하세요."
            type="text"
            {...register("title", { required: true })}
          />
        </SectionWrapper>
        <SectionWrapper>
          <div className="section__title">
            <label>세부사항</label>
            {errors.detail && <ErrorText>세부사항을 입력주세요.</ErrorText>}
          </div>

          <textarea
            className="section__content"
            placeholder="세부사항을 입력하세요."
            {...register("detail", { required: true })}
          />
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
        <SectionWrapper>
          <div className="section__title">
            <label>이용약관</label>
            {(errors.term1 || errors.term2) && (
              <ErrorText>약관에 동의해주세요.</ErrorText>
            )}
          </div>
          <SectionTerms className="section__content">
            <div className="section__terms-item">
              <input
                type="checkbox"
                value="termAll"
                id="termAll"
                {...register("termAll")}
              />
              <label htmlFor="termAll"></label>
              <p>이용약관 모두 동의</p>
            </div>
            <div className="section__terms-item">
              <input
                type="checkbox"
                value="term1"
                id="term1"
                {...register("term1", { required: true })}
              />
              <label htmlFor="term1" />
              <p>
                <span>(필수)</span> 요청사항을 5분 이내 취소할 수 있고 추후에
                취소는 불가능해요.
              </p>
            </div>
            <div className="section__terms-item">
              <input
                type="checkbox"
                value="term2"
                id="term2"
                {...register("term2", { required: true })}
              />
              <label htmlFor="term2" />
              <p>
                <span>(필수)</span> 개인정보 제공 동의
              </p>
            </div>
          </SectionTerms>
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
      <StickyFooter>
        <Button buttonType="contained" color="primary" onClick={openModal}>
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
