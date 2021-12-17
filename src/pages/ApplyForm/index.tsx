import { useApplyToErrand } from "@api/help";
import { useMyInfo } from "@api/user";
import { Check } from "@assets/icon";
import Button from "@components/Button";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import Modal from "@components/Modal";
import Profile from "@components/Profile";
import { toast } from "@components/Toast/Index";
import { MIN_LENGTH_TEXTAREA, PHONE_NUMBER_REGEX } from "@constant/validation";
import styled from "@emotion/styled";
import { WithParamsProps } from "@hoc/withParams";
import useModal from "@hooks/useModal";
import { useNavigator } from "@karrotframe/navigator";
import {
  ErrorText,
  InputTooltip,
  SectionTerms,
  SectionWrapper,
  StickyFooter,
  StickyPageWrpper,
  TextAreaWrapper,
} from "@styles/shared";
import CustomMixPanel from "@utils/mixpanel";
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
  const { isOpenModal, openModal, closeModal, innerMode } = useModal();
  const { replace } = useNavigator();
  const watchTextArea = watch("appeal");
  const mutationApplyErrand = useApplyToErrand({
    onSuccess: (helpId: string) => {
      closeModal();
      replace(`/helps/${helpId}`);
      toast("지원이 완료되었어요");
    },
    onError: () => {
      console.log("fail");
    },
  });

  const modalInfo = {
    confirm: {
      text: "작성한 내용으로 지원을 완료합니다.",
      no: (
        <button
          onClick={() => {
            CustomMixPanel.track(CustomMixPanel.eventName.clickNoConfirm, {
              page: "지원하기",
              confirm: "지원완료",
            });
            closeModal();
          }}
        >
          아니요
        </button>
      ),
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
                  inputMode="decimal"
                  placeholder="숫자만 입력해 주세요."
                  onClick={() => {
                    CustomMixPanel.track(CustomMixPanel.eventName.clickInput, {
                      page: "지원하기",
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
            <SectionWrapper>
              <div className="section__title">
                <label htmlFor="">하고싶은 말</label>
                {errors.appeal && (
                  <ErrorText>
                    하고싶은 말을 ${MIN_LENGTH_TEXTAREA}자 이상 입력해 주세요.
                  </ErrorText>
                )}
              </div>
              <TextAreaWrapper
                className="section__content"
                isError={Boolean(errors.appeal)}
                textLength={watchTextArea?.length ?? 0}
              >
                <InputTooltip>
                  🔥 <span>자신이 잘하는 것, 경력</span> 등을 상세히 작성하면
                  심부름 매칭이 더 잘 이루어져요.
                </InputTooltip>
                <textarea
                  maxLength={500}
                  onClick={() => {
                    CustomMixPanel.track(CustomMixPanel.eventName.clickInput, {
                      page: "지원하기",
                      clickTarget: "하고싶은 말",
                    });
                  }}
                  {...register("appeal", {
                    required: true,
                    minLength: MIN_LENGTH_TEXTAREA,
                    maxLength: 500,
                  })}
                />
                <div className="textarea__counter">
                  {watchTextArea?.length ?? 0}/500
                </div>
              </TextAreaWrapper>
            </SectionWrapper>
            <SectionWrapper>
              <div className="section__title">
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
                      onClick={() => {
                        CustomMixPanel.track(
                          CustomMixPanel.eventName.clickInput,
                          {
                            page: "지원하기",
                            clickTarget: "약관동의",
                          }
                        );
                      }}
                      {...register("term", { required: true })}
                    />
                    <label htmlFor="term">
                      <Check width="3.6rem" height="3.6rem" />
                    </label>
                    <p>
                      <span>(필수)</span> 매칭 시 공개되는 심부름 장소, 휴대폰
                      번호 등의 개인 정보를 심부름 목적 이외에 사용하지
                      않겠습니다.
                    </p>
                  </div>
                </SectionTerms>
              </div>
            </SectionWrapper>
          </>
        ) : (
          // TODO Loading..
          <div></div>
        )}
      </ApplyFormWrapper>
      {isOpenModal && innerMode && (
        <Modal {...{ closeModal, modalInfo, innerMode }} />
      )}
      <StickyFooter fullArea>
        <Button
          buttonType="contained"
          color="primary"
          fullWidth
          padding="1.8rem 0"
          disabled={!isValid}
          onClick={() => {
            openModal("confirm");
            CustomMixPanel.track(CustomMixPanel.eventName.clickCTA, {
              page: "지원하기",
              clickTarget: "지원하기",
            });
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
