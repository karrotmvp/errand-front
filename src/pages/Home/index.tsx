import { css } from "@emotion/react";
import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { ScreenHelmet } from "@karrotframe/navigator";
import List from "./List";

export default function Home() {
  const moveToApplyForm = usePush("/errand-request");

  return (
    <>
      <ScreenHelmet title="서현동" appendRight={RightAppender()} />
      <HomeWrapper>
        <ContentWrapper>
          <p className="home-header__left__info">심부름을 요청해보세요.</p>
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

  .home-fixed__fab {
    position: absolute;
    bottom: 2rem;
    right: 2rem;

    width: 4rem;
    height: 4rem;
    background: ${({ theme }) => theme.color.primary};
    border-radius: 2rem;
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
      <div onClick={moveToMy}>마이</div>
      <div onClick={moveToAlarm}>알람</div>
    </AppenderWrapper>
  );
};

const AppenderWrapper = styled.div`
  display: flex;
  & > div + div {
    margin-left: 1rem;
  }
`;
