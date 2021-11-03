import { Check, Gear, Me, Plus } from "@assets/icon";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import ToolTip from "@components/ToolTip";
import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { Container } from "@styles/shared";
import { useState } from "react";
import List from "./List";

export default function Home() {
  const moveToApplyForm = usePush("/errand-request");
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const [isAppliable, setIsAppliable] = useState<boolean>(false);

  const closeTooltip = () => {
    setShowTooltip(false);
  };

  const toggleIsAppliable = () => {
    setIsAppliable((current) => !current);
  };

  return (
    <>
      <CustomScreenHelmet
        title={
          <Title>
            <h1>당근심부름</h1>
            <span>Beta</span>
          </Title>
        }
        appendRight={RightAppender()}
      />
      <HomeWrapper>
        <ContentWrapper>
          <Container>
            <div className="home__top">
              <div className="home__top__location">
                <h2>
                  <span>서현동</span> 주변
                </h2>
              </div>
              <div
                className={`home__top__check ${
                  isAppliable ? "primary" : "grey"
                }`}
                onClick={toggleIsAppliable}
              >
                <Check />
                <span>지원가능한 심부름 보기</span>
              </div>
            </div>
            {showTooltip && (
              <ToolTip
                text="당근마켓에서 인증한 동네에서 심부름을 요청할 수 있어요."
                closeTooltip={closeTooltip}
              />
            )}
          </Container>
          <List tabType="main" isAppliable={isAppliable} />
        </ContentWrapper>
        <button className="home__fixed-fab" onClick={moveToApplyForm}>
          <Plus stroke="white" />
        </button>
      </HomeWrapper>
    </>
  );
}

const Title = styled.div`
  display: flex;
  align-items: flex-end;

  & > span {
    color: ${({ theme }) => theme.color.primary};
    font-size: 1.2rem;
    font-weight: 500;
    margin-left: 0.5rem;
  }
`;

const HomeWrapper = styled.main`
  height: 100%;
  position: relative;
  .home {
    &__top {
      margin-top: 2rem;

      display: flex;
      justify-content: space-between;
      align-items: center;

      &__location {
        position: relative;
        font-size: 1.7rem;
        font-weight: 700;

        display: flex;
        align-items: center;
        h2 {
          font-family: Cafe24Ssurround;
          span {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
      &__check {
        display: flex;
        align-items: center;
        & > span {
          margin-left: 0.4rem;
          ${({ theme }) => theme.font("small", "medium")}
          line-height: 0;
        }
        &.primary {
          color: ${({ theme }) => theme.color.primary};
          & > svg {
            fill: ${({ theme }) => theme.color.primary};
            stroke: white;
          }
        }
        &.grey {
          color: ${({ theme }) => theme.color.grey4};
          & > svg {
            fill: ${({ theme }) => theme.color.grey7};
            stroke: ${({ theme }) => theme.color.grey5};
          }
        }
      }
    }
    &__container {
      ${({ theme }) => theme.container}
    }
    &__fixed-fab {
      position: absolute;
      bottom: 2rem;
      right: 2rem;

      width: 5.7rem;
      height: 5.7rem;
      background: ${({ theme }) => theme.color.primary};
      border-radius: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const ContentWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const RightAppender = () => {
  const moveToMy = usePush("/my");
  const moveToAlarm = usePush("/alarm");

  return (
    <AppenderWrapper>
      <div onClick={moveToMy}>
        <Me />
      </div>
      <div onClick={moveToAlarm}>
        <Gear />
      </div>
    </AppenderWrapper>
  );
};

const AppenderWrapper = styled.div`
  display: flex;

  & > div {
    display: flex;
    align-items: center;
  }
  & > div + div {
    margin-left: 1.8rem;
  }
`;
