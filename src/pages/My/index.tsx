import React, { useState } from "react";
import styled from "@emotion/styled";
import List from "@pages/Home/List";
import { Tabs } from "@karrotframe/tabs";
import Profile from "@components/Profile";
import { useMyInfo } from "@api/users";
import CustomScreenHelmet from "@components/CustomScreenHelmet";

export default function My() {
  const [activeTabKey, setActiveTabKey] = useState<string>("tab_1");
  const { status, data: myInfo } = useMyInfo();

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
          tabs={[
            {
              key: "tab_1",
              buttonLabel: "요청한 심부름",
              component: () => <List tabType="request" />,
            },
            {
              key: "tab_2",
              buttonLabel: "지원한 심부름",
              component: () => <List tabType="help" />,
            },
          ]}
          onTabChange={(key) => {
            setActiveTabKey(key);
          }}
        />
      </MyWrapper>
    </>
  );
}

const MyWrapper = styled.div`
  .my {
    &__info {
      padding: 2.5rem;
      ${({ theme }) => theme.container}
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__tabs {
      a {
        ${({ theme }) => theme.font("medium", "bold")}

        padding: 1.5rem 0;
      }
    }
  }
`;
