import styled from "@emotion/styled";
import { Tabs } from "@karrotframe/tabs";
import { useState } from "react";
import List from "./List";

export default function Home() {
  const [activeTabKey, setActiveTabKey] = useState<string>("tab_1");

  return (
    <Wrapper>
      <header className="home-header">
        <div className="home-header__left">
          <div className="home-header__left__location">서현동</div>
          <p className="home-header__left__info">심부름을 요청해보세요.</p>
        </div>
        <button className="btn-request">요청하기</button>
      </header>
      <Tabs
        className="home-tabs"
        activeTabKey={activeTabKey}
        tabs={[
          {
            key: "tab_1",
            buttonLabel: "메인",
            component: () => <List tabType="main" />,
          },
          {
            key: "tab_2",
            buttonLabel: "요청내역",
            component: () => <List tabType="request" />,
          },
          {
            key: "tab_3",
            buttonLabel: "도움내역",
            component: () => <List tabType="help" />,
          },
        ]}
        onTabChange={(key) => {
          setActiveTabKey(key);
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .home-tabs {
    a {
      ${({ theme }) => theme.font("medium", "bold")}

      padding: 1.5rem 0;
    }
  }

  .home-header {
    ${({ theme }) => theme.container}
    padding-top: 3rem;
    padding-bottom: 3rem;

    background: ${(props) => props.theme.color.primary};
    display: flex;
    justify-content: space-between;

    &__left {
      color: white;
      &__location {
        ${({ theme }) => theme.font("medium")}
      }
      &__info {
        ${({ theme }) => theme.font("large", "bold")}
      }
    }

    & > .btn-request {
      ${({ theme }) => theme.font("small", "bold")}
      color: ${({ theme }) => theme.color.default};

      padding: 1.6rem 2.8rem;
      border-radius: 10rem;
    }
  }
`;
