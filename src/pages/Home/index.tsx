import { Gear, Map, Me, Plus } from "@assets/icon";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import ToolTip from "@components/ToolTip";
import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { useState } from "react";
import List from "./List";

export default function Home() {
  const moveToApplyForm = usePush("/errand-request");
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const closeTooltip = () => {
    setShowTooltip(false);
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
          <div className="home__banner">
            <Map />
            <span>서현동</span>의 심부름
          </div>
          {showTooltip && (
            <div className="home__container">
              <ToolTip
                text="당근마켓에서 인증한 동네에서 심부름을 요청할 수 있어요."
                closeTooltip={closeTooltip}
              />
            </div>
          )}

          <List tabType="main" />
        </ContentWrapper>
        <button className="home__fixed-fab" onClick={moveToApplyForm}>
          <Plus />
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
    &__banner {
      ${({ theme }) => theme.container}
      margin-top: 2rem;
      font-size: 1.7rem;
      font-weight: 700;

      display: flex;
      align-items: center;

      span {
        color: ${({ theme }) => theme.color.primary};
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
