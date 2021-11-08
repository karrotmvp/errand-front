import { useMyInfo } from "@api/users";
import Button from "@components/Button";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import Profile from "@components/Profile";
import styled from "@emotion/styled";
import { WithParamsProps } from "@hoc/withParams";
import usePush from "@hooks/usePush";
import {
  ErrorText,
  SectionTerms,
  SectionWrapper,
  StickyFooter,
  StickyPageWrpper,
  TextAreaWrapper,
} from "@styles/shared";
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

  const moveToErrandDetail = usePush(`/errands/${errandId}`);
  const watchTextArea = watch("appeal");

  const onSubmit: SubmitHandler<Inputs> = async (result) => {
    const isSuccess = true;
    if (isSuccess) {
      moveToErrandDetail();
    } else {
      console.log("no1");
    }
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
                      <span>(필수)</span> 개인정보 제공 동의
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
      <StickyFooter fullArea>
        <Button
          buttonType="contained"
          color="primary"
          form="apply-form"
          fullWidth
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
