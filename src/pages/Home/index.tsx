import { css } from "@emotion/react";
import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { ScreenHelmet } from "@karrotframe/navigator";
import List from "./List";

export default function Home() {
  return (
    <Wrapper>
      <ScreenHelmet title="서현동" appendRight={RightAppender()} />
      <p className="home-header__left__info">심부름을 요청해보세요.</p>
      <List tabType="main" />
    </Wrapper>
  );
}

const Wrapper = styled.main`
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
