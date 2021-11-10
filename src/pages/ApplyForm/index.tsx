import { useApplyToErrand } from "@api/help";
import { useMyInfo } from "@api/user";
import Button from "@components/Button";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import Modal from "@components/Modal";
import Profile from "@components/Profile";
import styled from "@emotion/styled";
import { WithParamsProps } from "@hoc/withParams";
import useModal from "@hooks/useModal";
import { useNavigator } from "@karrotframe/navigator";
import {
  ErrorText,
  SectionTerms,
  SectionWrapper,
  StickyFooter,
  StickyPageWrpper,
  TextAreaWrapper,
} from "@styles/shared";
import { getValueFromSearch } from "@utils/utils";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  phoneNumber: string;
  appeal: string;
  term: boolean;
};

export default function ApplyForm({ errandId }: WithParamsProps) {
  const { status, data: my } = useMyInfo();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { isOpen, openModal, closeModal, innerMode } = useModal();
  const { pop } = useNavigator();
  const watchTextArea = watch("appeal");
  const mutationApplyErrand = useApplyToErrand({
    onSuccess: () => {
      closeModal();
      pop();
    },
    onError: () => {
      console.log("fail");
    },
  });
  const modalInfo = {
    confirm: {
      text: "작성한 내용으로 지원을 완료합니다.",
      no: <button onClick={closeModal}>아니요</button>,
      yes: <button form="apply-form">지원하기</button>,
    },
  };

  const onSubmit: SubmitHandler<Inputs> = async (result) => {
    const { phoneNumber, appeal } = result;
    const regionId = getValueFromSearch("region_id") ?? "";

    mutationApplyErrand.mutate({ errandId, phoneNumber, appeal, regionId });
  };

  return (
    <StickyPageWrpper>
      <CustomScreenHelmet title="지원하기" />
      <ApplyFormWrapper onSubmit={handleSubmit(onSubmit)} id="apply-form">
        {status !== "loading" && my ? (
          <>
            <SectionWrapper>
              <div className="section__title">
                <h3>프로필</h3>
              </div>
              <div className="section__content">
                <Profile {...my} />
              </div>
            </SectionWrapper>
            <SectionWrapper>
              <div className="section__title">
                <label htmlFor="">전화번호</label>
                {errors.phoneNumber && (
                  <ErrorText>전화번호를 입력해주세요.</ErrorText>
                )}
              </div>
              <div className="section__subscribe">
                전화번호는 매칭된 상대에게만 보여요.
              </div>
              <div className="section__content">
                <input
                  type="text"
                  placeholder="숫자만 입력해주세요."
                  {...register("phoneNumber", { required: true })}
                />
              </div>
            </SectionWrapper>
            <SectionWrapper>
              <div className="section__title">
                <label htmlFor="">하고싶은 말</label>
                {errors.appeal && (
                  <ErrorText>하고싶은 말을 입력해주세요.</ErrorText>
                )}
              </div>
              <TextAreaWrapper className="section__content">
                <textarea
                  maxLength={500}
                  placeholder="지원하는 심부름에 대한 자신의 강점을 구체적으로 이야기해주세요."
                  {...register("appeal", { required: true })}
                />
                <div>{watchTextArea?.length ?? 0}/500</div>
              </TextAreaWrapper>
            </SectionWrapper>
            <SectionWrapper>
              <div className="section__title">
                <label>이용약관</label>
                {errors.term && <ErrorText>약관에 동의해주세요.</ErrorText>}
              </div>
              <div className="section__content">
                <SectionTerms>
                  <div className="section__terms-item">
                    <input
                      type="checkbox"
                      value="term"
                      id="term"
                      {...register("term", { required: true })}
                    />
                    <label htmlFor="term" />
                    <p>
                      <span>(필수)</span> 매칭 시 공개되는 심부름 장소, 휴대폰
                      번호 등의 개인 정보를 심부름 목적 이외 사용하지
                      않겠습니다.
                    </p>
                  </div>
                </SectionTerms>
              </div>
            </SectionWrapper>
          </>
        ) : (
          <div>로딩 중</div>
        )}
      </ApplyFormWrapper>
      {isOpen && innerMode && (
        <Modal {...{ closeModal, modalInfo, innerMode }} />
      )}
      <StickyFooter fullArea>
        <Button
          buttonType="contained"
          color="primary"
          fullWidth
          onClick={() => {
            openModal("confirm");
          }}
        >
          지원하기
        </Button>
      </StickyFooter>
    </StickyPageWrpper>
  );
}

const ApplyFormWrapper = styled.form`
  margin: 3rem 0;
  ${({ theme }) => theme.container}
`;
