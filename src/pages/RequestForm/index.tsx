import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ScreenHelmet, useNavigator } from "@karrotframe/navigator";
import { useForm, SubmitHandler } from "react-hook-form";
import { css } from "@emotion/react";
import { registerErrand } from "@api/errand";

type RequestFormProps = {};

const defaultValues = {
  categoryId: 1,
  title: "default",
  detail: "default",
  reward: 0,
  detailAddress: "default",
  phoneNumber: "01012345678",
  termAll: true,
  term1: false,
  term2: false,
};

type Inputs = {
  categoryId: number;
  title: string;
  detail: string;
  reward: number;
  detailAddress: string;
  phoneNumber: string;
  termAll: boolean;
  term1: boolean;
  term2: boolean;
};

export default function RequestForm({}: RequestFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues });

  const watchTermAll = watch("termAll", false);
  const isAll = watch(["term1", "term2"]).every((el) => el);
  const { push } = useNavigator();

  const onSubmit: SubmitHandler<Inputs> = async (result) => {
    const { categoryId, title, detail, reward, detailAddress, phoneNumber } =
      result;

    const errandId = await registerErrand({
      categoryId,
      title,
      detail,
      reward,
      detailAddress,
      phoneNumber,
      regionId: "1234",
    });
    //TODO : 새글 등록 요청 하고 그 글의 id를 전달받아서 push
    push(`/errands/${errandId}`);
  };

  useEffect(() => {
    const termAll = getValues("termAll");

    if (isAll !== termAll) {
      setValue("term1", termAll);
      setValue("term2", termAll);
    }
  }, [watchTermAll, setValue, getValues]);

  useEffect(() => {
    if (getValues("termAll") !== isAll) {
      setValue("termAll", isAll);
    }
  }, [isAll, setValue, getValues]);

  return (
    <RequestFormWrapper>
      <ScreenHelmet title="요청하기" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="errand-form"
        className="errand-request__form"
      >
        <div className="errand-request__input-section">
          <div className="section-title">
            <label>카테고리</label>
            {errors.categoryId && (
              <ErrorText>카테고리를 선택해주세요.</ErrorText>
            )}
          </div>
          <select {...register("categoryId", { required: true })}>
            <option value="1">벌레잡기</option>
            <option value="2">반려동물 산책하기</option>
            <option value="3">하나뭐였지</option>
            <option value="4">기타</option>
          </select>
        </div>
        <div className="errand-request__input-section">
          <div className="section-title">
            <label>사진첨부</label>
            <span className="color-grey">(선택)</span>
          </div>
          <div>
            <div>풀러스</div>
          </div>
        </div>
        <div className="errand-request__input-section">
          <div className="section-title">
            <label>요청제목</label>
            {errors.title && <ErrorText>제목을 입력해주세요.</ErrorText>}
          </div>
          <input
            placeholder="제목을 입력하세요."
            type="text"
            {...register("title", { required: true })}
          />
        </div>
        <div className="errand-request__input-section">
          <div className="section-title">
            <label>세부사항</label>
            {errors.detail && <ErrorText>세부사항을 입력주세요.</ErrorText>}
          </div>
          <textarea
            placeholder="세부사항을 입력하세요."
            {...register("detail", { required: true })}
          />
        </div>
        <div className="errand-request__input-section">
          <div className="section-title">
            <label>요청장소</label>
            {errors.detailAddress && (
              <ErrorText>상세주소를 입력해주세요.</ErrorText>
            )}
          </div>
          <p className="color-grey">매칭되었을 때에만 상세주소가 공개돼요.</p>
          <input className="section-disabled" defaultValue="서현동" disabled />
          <input
            placeholder="상세주소를 입력하세요."
            type="text"
            {...register("detailAddress", { required: true })}
          />
        </div>
        <div className="errand-request__input-section">
          <div className="section-title">
            <label>전화번호</label>
            {errors.phoneNumber && (
              <ErrorText>전화번호를 입력해주세요.</ErrorText>
            )}
          </div>
          <p className="color-grey">매칭되었을 때에만 전화번호가 공개돼요.</p>
          <input
            placeholder="전화번호를 입력하세요."
            type="number"
            defaultValue="1234"
            {...register("phoneNumber", { required: true })}
          />
        </div>
        <div className="errand-request__input-section">
          <div className="section-title">
            <label>이용약관</label>
            {(errors.term1 || errors.term2) && (
              <ErrorText>약관에 동의해주세요.</ErrorText>
            )}
          </div>
          <div className="section-terms">
            <div className="section-terms__item">
              <input
                type="checkbox"
                value="termAll"
                id="termAll"
                {...register("termAll")}
              />
              <label htmlFor="termAll"></label>
              <p>이용약관 모두 동의</p>
            </div>
            <div className="section-terms__item">
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
            <div className="section-terms__item">
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
          </div>
        </div>
      </form>
      <input
        type="submit"
        className="errand-request__submit-btn"
        form="errand-form"
      />
    </RequestFormWrapper>
  );
}

const RequestFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .errand-request {
    &__form {
      flex: 1;
      padding: 2rem 0;
      ${({ theme }) => theme.container}
      & > div + div {
        margin-top: 3.5rem;
      }
    }

    &__input-section {
      .section-title {
        display: flex;
        align-items: center;
        margin-bottom: 0.6rem;

        label {
          ${({ theme }) => theme.font("small", "bold")}
        }
      }

      .section-terms {
        display: flex;
        flex-direction: column;
        &__item {
          display: flex;
          align-items: center;

          p {
            margin-left: 1.4rem;
            ${({ theme }) => theme.font("medium")}
            span {
              color: ${({ theme }) => theme.color.primary};
            }
          }
        }
      }

      .section-terms__item + .section-terms__item {
        margin-top: 1.5rem;
      }

      .section-disabled {
        background: ${({ theme }) => theme.color.grey6};
      }

      .color-grey {
        color: ${({ theme }) => theme.color.grey3};
      }

      input,
      select,
      textarea {
        border: 0.1rem solid ${({ theme }) => theme.color.grey6};
        ${({ theme }) => css`
          ${theme.font("medium")}
          border-radius: 1rem;
        `}
        width: 100%;
        padding: 1rem 1.8rem;
        &::placeholder {
          color: ${({ theme }) => theme.color.grey4};
        }
      }

      input + input {
        margin-top: 0.5rem;
      }

      input[type="checkbox"] {
        display: none;
        & + label {
          display: inline-block;
          min-width: 3.6rem;
          min-height: 3.6rem;
          border-radius: 1.8rem;
          border: 1px solid ${({ theme }) => theme.color.grey6};
        }
        &:checked + label {
          background: ${({ theme }) => theme.color.primary};
          border: none;
        }
      }

      textarea {
        height: 16rem;
      }
    }

    &__submit-btn {
      width: 100%;
      background: tan;
      padding: 1rem 0;
    }
  }
`;

const ErrorText = styled.p`
  margin-left: 2rem;
  color: ${({ theme }) => theme.color.fail};
  ${({ theme }) => theme.font("small")}
`;
