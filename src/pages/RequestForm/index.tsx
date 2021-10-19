import React from "react";
import styled from "@emotion/styled";
import { ScreenHelmet } from "@karrotframe/navigator";
import { useForm, SubmitHandler } from "react-hook-form";
import { css } from "@emotion/react";
import { theme } from "@styles/theme";

type RequestFormProps = {};
type Inputs = {
  category: string;
  title: string;
  detail: string;
  location: string;
  tel: string;
  termAll: boolean;
  term1: boolean;
  term2: boolean;
};

export default function RequestForm({}: RequestFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (result) => {
    console.log(result);
  };

  console.log(errors);

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
            {errors.category && <ErrorText>카테고리를 선택해주세요.</ErrorText>}
          </div>
          <select {...register("category", { required: true })}>
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
            {...register("title", { required: true })}
            placeholder="제목을 입력하세요."
            type="text"
            defaultValue="dd"
          />
        </div>
        <div className="errand-request__input-section">
          <div className="section-title">
            <label>세부사항</label>
            {errors.detail && <ErrorText>세부사항을 입력주세요.</ErrorText>}
          </div>
          <textarea
            {...register("detail", { required: true })}
            placeholder="세부사항을 입력하세요."
            defaultValue="dd"
          />
        </div>
        <div className="errand-request__input-section">
          <div className="section-title">
            <label>요청장소</label>
            {errors.location && <ErrorText>상세주소를 입력해주세요.</ErrorText>}
          </div>
          <p className="color-grey">매칭되었을 때에만 상세주소가 공개돼요.</p>
          <input className="section-disabled" defaultValue="서현동" disabled />
          <input
            {...register("location", { required: true })}
            placeholder="상세주소를 입력하세요."
            type="text"
            defaultValue="dd"
          />
        </div>
        <div className="errand-request__input-section">
          <div className="section-title">
            <label>전화번호</label>
            {errors.tel && <ErrorText>전화번호를 입력해주세요.</ErrorText>}
          </div>
          <p className="color-grey">매칭되었을 때에만 전화번호가 공개돼요.</p>
          <input
            {...register("tel", { required: true })}
            placeholder="전화번호를 입력하세요."
            type="number"
            defaultValue="1234"
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
                {...register("termAll")}
                type="checkbox"
                name="term"
                value="termAll"
                id="termAll"
              />
              <label htmlFor="termAll" />
              <p>이용약관 모두 동의</p>
            </div>
            <div className="section-terms__item">
              <input
                {...register("term1", { required: true })}
                type="checkbox"
                name="term"
                value="term1"
                id="term1"
              />
              <label htmlFor="term1" />
              <p>
                <span>(필수)</span> 요청사항을 5분 이내 취소할 수 있고 추후에
                취소는 불가능해요.
              </p>
            </div>
            <div className="section-terms__item">
              <input
                {...register("term2", { required: true })}
                type="checkbox"
                name="term"
                value="term2"
                id="term2"
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
