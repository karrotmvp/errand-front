import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import List from "@components/List";
import { Tabs } from "@karrotframe/tabs";
import Profile from "@components/Profile";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { useMyInfo } from "@api/user";

export default function My() {
  const [activeTabKey, setActiveTabKey] = useState<string>("tab_1");
  const { status, data: myInfo } = useMyInfo();
  const memo = useMemo(
    () => [
      {
        key: "tab_1",
        buttonLabel: "요청한 심부름",
        component: () => (
          <List tabType="request" activeTabKey={new Date().toString()} />
        ),
      },
      {
        key: "tab_2",
        buttonLabel: "지원한 심부름",
        component: () => (
          <List tabType="help" activeTabKey={new Date().toString()} />
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
            setActiveTabKey(key);
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
