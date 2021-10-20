import styled from "@emotion/styled";
import { ScreenHelmet, useParams } from "@karrotframe/navigator";
import usePush from "@hooks/usePush";
import { useErrandDetail } from "@api/errand";
import { DEFAULT_THUMBNAIL } from "@constant/default";
import { InputWrapper } from "@styles/shared";
// type ErrandDetailProps = {};

// function validateParams(props: { id?: string }): props is { id: string } {
//   return Boolean(props.id);
// }

export default function ErrandDetail() {
  const moveToApplyForm = usePush("/apply-form");
  const params = useParams<{ id: string }>();

  if (!params.id) {
    throw new Error();
  }
  const { status, data } = useErrandDetail(params.id);
  return (
    <ErrandDetailWrapper>
      <ScreenHelmet title="상세페이지" />
      {status !== "loading" ? (
        <>
          <div className="errand-detail__image">
            <img src={DEFAULT_THUMBNAIL} alt="dummy" />
          </div>
          <div className="errand-detail__contents">
            <h2>{data?.errand.title}</h2>
            <div className="errand-detail__contents__sub-info">
              <span>{data?.errand.category.name}</span>
              <span>{data?.errand.region.name}</span>
              <span>11시간 전</span>
            </div>
            <p>{data?.errand.detail}</p>
            <InputWrapper>
              <div className="section-title">
                <label>요청제목</label>
              </div>
              <input type="text" value={data?.errand.reward} disabled />
            </InputWrapper>
            <InputWrapper>
              <div className="section-title">
                <label>요청장소</label>
              </div>
              <input type="text" value={data?.errand.region.name} disabled />
            </InputWrapper>
          </div>
          <div className="errand-detail__footer">
            <button onClick={moveToApplyForm}>일단 지원하기</button>
          </div>
        </>
      ) : (
        <div>로딩 중</div>
      )}
    </ErrandDetailWrapper>
  );
}

const ErrandDetailWrapper = styled.div`
  .errand-detail {
    &__image {
      width: 100%;
      & > img {
        width: 100%;
      }
    }
    &__contents {
      padding: 2.2rem 0;
      ${({ theme }) => theme.container}

      h2 {
        ${({ theme }) => theme.font("large", "bold")}
      }

      &__sub-info {
        ${({ theme }) => theme.font("small", "medium")}
        color: ${({ theme }) => theme.color.grey4};
        margin-top: 0.7rem;

        & > span + span::before {
          content: " • ";
          margin: 0 0.5rem;
        }
      }
      p {
        ${({ theme }) => theme.font("medium")}
        margin-top: 2.3rem;
        margin-bottom: 3.8rem;
      }
    }
    &__footer {
      position: sticky;
      bottom: 0;
      width: 100%;
      padding: 1.2rem 2rem;
      background: white;

      button {
        ${({ theme }) => theme.font("medium")}
        color: white;
        padding: 1.4rem 0;
        border-radius: 0.5rem;
        width: 100%;
        background: ${({ theme }) => theme.color.primary};
      }
    }
  }
`;
