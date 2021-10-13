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
        className="home-tabs"
        activeTabKey={activeTabKey}
        tabs={[
          {
            key: "tab_1",
            buttonLabel: "메인",
            component: () => <List listFilter="main" />,
          },
          {
            key: "tab_2",
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
  .home-tabs {
    a {
      ${({ theme }) => theme.font.size.medium}
      font-weight: ${({ theme }) => theme.font.weight.bold};
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
        ${({ theme }) => theme.font.size.medium}
      }
      &__info {
        ${({ theme }) => theme.font.size.large}
        font-weight: ${({ theme }) => theme.font.weight.bold};
      }
    }

    & > .btn-request {
      ${({ theme }) => theme.font.size.small}
      font-weight: ${({ theme }) => theme.font.weight.bold};
      color: ${({ theme }) => theme.color.default};

      padding: 1.6rem 2.8rem;
      border-radius: 10rem;
    }
  }
`;
