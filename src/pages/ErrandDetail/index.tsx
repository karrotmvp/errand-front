import styled from "@emotion/styled";
import { useParams } from "@karrotframe/navigator";
import usePush from "@hooks/usePush";
import { DEFAULT_THUMBNAIL } from "@constant/default";
import { SectionWrapper, StickyFooter, StickyPageWrpper } from "@styles/shared";
import { useErrandDetail } from "@api/errands";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { Meatballs } from "@assets/icon";

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

  const handleClickMeatballs = () => {
    
  };
  return (
    <StickyPageWrpper>
      <CustomScreenHelmet
        customBackButton={<div>커스텀</div>}
        title="상세페이지"
        appendRight={<Meatballs />}
      />
      <ErrandDetailWrapper>
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
              <SectionWrapper>
                <div className="section__title">
                  <h3>요청제목</h3>
                </div>
                <input type="text" value={data?.errand.reward} disabled />
              </SectionWrapper>
              <SectionWrapper>
                <div className="section__title">
                  <h3>요청장소</h3>
                </div>
                <input type="text" value={data?.errand.region.name} disabled />
              </SectionWrapper>
            </div>
          </>
        ) : (
          <div>로딩 중</div>
        )}
      </ErrandDetailWrapper>
      <StickyFooter>
        <button onClick={moveToApplyForm}>일단 지원하기</button>
      </StickyFooter>
    </StickyPageWrpper>
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
  }
`;
