import styled from "@emotion/styled";
import { Tabs } from "@karrotframe/tabs";
import { useState } from "react";
import List from "./List";

export default function Home() {
  const [activeTabKey, setActiveTabKey] = useState<string>("tab_1");

  return (
    <Wrapper>
      <div className="home-header">
        <div className="home-header__left">
          <div className="home-header__left__location">서현동</div>
          <p className="home-header__left__info">심부름을 요청해보세요.</p>
        </div>
        <button className="btn-request">요청하기</button>
      </div>
      <Tabs
        activeTabKey={activeTabKey}
        tabs={[
          {
            key: "tab_1",
            buttonLabel: "메인",
            component: () => <List listFilter="main" />,
          },
          {
            key: "tab_23",
            buttonLabel: "요청내역",
            component: () => <List listFilter="request" />,
          },
          {
            key: "tab_3",
            buttonLabel: "도움내역",
            component: () => <List listFilter="support" />,
          },
        ]}
        onTabChange={(key) => {
          setActiveTabKey(key);
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .home-header {
    ${({ theme }) => theme.container}
    padding-top: 30px;
    padding-bottom: 30px;

    background: ${(props) => props.theme.color.primary};
    display: flex;
    justify-content: space-between;

    &__left {
      color: white;
      &__location {
        ${({ theme }) => theme.font.size.medium}
      }
      &__info {
        ${({ theme }) => theme.font.size.large}
        font-weight: ${({ theme }) => theme.font.weight.large};
      }
    }

    & > .btn-request {
      ${({ theme }) => theme.font.size.small}
      font-weight: ${({ theme }) => theme.font.weight.large};
      color: ${({ theme }) => theme.color.default};

      padding: 16px 28px;
      border-radius: 100px;
    }
  }
`;
