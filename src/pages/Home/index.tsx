import { css } from "@emotion/react";
import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { ScreenHelmet } from "@karrotframe/navigator";
import List from "./List";

export default function Home() {
  const moveToApplyForm = usePush("/errand-request");

  return (
    <Wrapper>
      <ScreenHelmet title="서현동" appendRight={RightAppender()} />
      <p className="home-header__left__info">심부름을 요청해보세요.</p>
      <List tabType="main" />
      <div className="home-fixed__fab">
        <button className="home__fab" onClick={moveToApplyForm}>
          +
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: 100vh;
  overflow-y: scroll;
  p {
    ${({ theme }) => css`
      ${theme.container}
      ${theme.font("large", "bold")}
    `}
  }
  .home-fixed__fab {
    position: fixed;
    bottom: 2rem;
    right: 2rem;

    /* position: sticky;
    bottom: 0;
    display: flex;
    justify-content: flex-end; */

    button {
      width: 4rem;
      height: 4rem;
      background: ${({ theme }) => theme.color.primary};
      border-radius: 2rem;
    }
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
