import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import { Tabs } from "@karrotframe/tabs";
import Profile from "@components/Profile";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { useMyInfo } from "@api/user";
import { TabType } from "@type/client";
import ListFetcher from "@components/List/ListFetcher";

export default function My() {
  const [activeTabKey, setActiveTabKey] = useState<TabType>("request");
  const { status, data: myInfo } = useMyInfo();
  const memo = useMemo(
    () => [
      {
        key: "request",
        buttonLabel: "요청한 심부름",
        render: () => (
          <ListFetcher tabType="request" activeTabKey={new Date().toString()} />
        ),
      },
      {
        key: "help",
        buttonLabel: "지원한 심부름",
        render: () => (
          <ListFetcher tabType="help" activeTabKey={new Date().toString()} />
        ),
      },
    ],
    []
  );

  return (
    <>
      <CustomScreenHelmet title={<div>마이페이지</div>} />
      <MyWrapper>
        <div className="my__info">
          {status !== "loading" && myInfo && <Profile {...myInfo} />}
        </div>
        <Tabs
          className="my__tabs"
          activeTabKey={activeTabKey}
          tabs={memo}
          onTabChange={(key) => {
            setActiveTabKey(key as TabType);
          }}
        />
      </MyWrapper>
    </>
  );
}

const MyWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .my {
    &__info {
      padding: 2.5rem;
      ${({ theme }) => theme.container}
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__tabs {
      flex: 1;
      a {
        ${({ theme }) => theme.font("medium")}
        padding: 1.5rem 0;
      }
    }
  }
`;
