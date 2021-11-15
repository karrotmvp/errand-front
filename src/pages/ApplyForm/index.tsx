import { useApplyToErrand } from "@api/help";
import { useMyInfo } from "@api/user";
import { Check } from "@assets/icon";
import Button from "@components/Button";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import Modal from "@components/Modal";
import Profile from "@components/Profile";
import ToolTip from "@components/ToolTip";
import { PHONE_NUMBER_REGEX } from "@constant/validation";
import styled from "@emotion/styled";
import { WithParamsProps } from "@hoc/withParams";
import useModal from "@hooks/useModal";
import { useTooltip } from "@hooks/useTooltip";
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
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onChange" });
  const { isOpen, openModal, closeModal, innerMode } = useModal();
  const { pop } = useNavigator();
  const [showTooltip, closeTooltip] = useTooltip("apply");
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
            <SectionWrapper isError={Boolean(errors.phoneNumber)}>
              <div className="section__title">
                <label htmlFor="">전화번호</label>
                {errors.phoneNumber && (
                  <ErrorText>전화번호를 입력해 주세요.</ErrorText>
                )}
              </div>
              <div className="section__subscribe">
                전화번호는 매칭된 상대에게만 보여요.
              </div>
              <div className="section__content">
                <input
                  type="number"
                  placeholder="숫자만 입력해 주세요."
                  {...register("phoneNumber", {
                    required: true,
                    pattern: PHONE_NUMBER_REGEX,
                  })}
                />
              </div>
            </SectionWrapper>
            <SectionWrapper>
              <div className="section__title">
                <label htmlFor="">하고싶은 말</label>
                {errors.appeal && (
                  <ErrorText>하고싶은 말을 10자 이상 입력해 주세요.</ErrorText>
                )}
              </div>
              <TextAreaWrapper
                className="section__content"
                isError={Boolean(errors.appeal)}
              >
                <textarea
                  maxLength={500}
                  placeholder="지원하는 심부름에 대한 자신의 강점을 구체적으로 이야기해 주세요."
                  {...register("appeal", {
                    required: true,
                    minLength: 10,
                    maxLength: 500,
                  })}
                />
                <div>{watchTextArea?.length ?? 0}/500</div>
              </TextAreaWrapper>
            </SectionWrapper>
            <SectionWrapper>
              <div className="section__title">
                {showTooltip && (
                  <ToolTip
                    text="요청장소와 전화번호는 매칭된 상대에게만 보여요."
                    closeTooltip={closeTooltip}
                    tail="down"
                  />
                )}
                <label>이용약관</label>
                {errors.term && <ErrorText>약관에 동의해 주세요.</ErrorText>}
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
                    <label htmlFor="term">
                      <Check width="3.6rem" height="3.6rem" />
                    </label>
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
          padding="1.7rem 0 4rem 0"
          disabled={!isValid}
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
