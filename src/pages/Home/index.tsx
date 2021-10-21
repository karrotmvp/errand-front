import { Gear, Map, Me } from "@assets/icon";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import List from "./List";

export default function Home() {
  const moveToApplyForm = usePush("/errand-request");

  return (
    <>
      <CustomScreenHelmet title="서현동" appendRight={RightAppender()} />
      <HomeWrapper>
        <ContentWrapper>
          <div className="home-banner">
            <Map />
            <span>서현동</span>의 심부름
          </div>
          <List tabType="main" />
        </ContentWrapper>
        <button className="home-fixed__fab" onClick={moveToApplyForm}>
          +
        </button>
      </HomeWrapper>
    </>
  );
}

const HomeWrapper = styled.main`
  height: 100%;
  position: relative;
  .home-banner {
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

  .home-fixed__fab {
    position: absolute;
    bottom: 2rem;
    right: 2rem;

    width: 5.7rem;
    height: 5.7rem;
    background: ${({ theme }) => theme.color.primary};
    border-radius: 3rem;

    color: white;
    // TODO. SVG 아이콘으로 대체
    font-size: 23px;
  }
`;
const ContentWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
  p {
    ${({ theme }) => css`
      ${theme.container}
      ${theme.font("large", "bold")}
    `}
  }
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
  margin-right: 2rem;

  & > div {
    display: flex;
    align-items: center;
  }
  & > div + div {
    margin-left: 1.8rem;
  }
`;
