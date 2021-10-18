import React, { useState } from "react";
import styled from "@emotion/styled";
import { ScreenHelmet } from "@karrotframe/navigator";
import List from "@pages/Home/List";
import { Tabs } from "@karrotframe/tabs";

type MyProps = {};

export default function My({}: MyProps) {
  const [activeTabKey, setActiveTabKey] = useState<string>("tab_1");

  return (
    <MyWrapper>
      <ScreenHelmet title="마이페이지" />
      <MyProfile />
      <Tabs
        className="home-tabs"
        activeTabKey={activeTabKey}
        tabs={[
          {
            key: "tab_1",
            buttonLabel: "내 부탁",
            component: () => <List tabType="main" />,
          },
          {
            key: "tab_2",
            buttonLabel: "도움내역",
            component: () => <List tabType="request" />,
          },
        ]}
        onTabChange={(key) => {
          setActiveTabKey(key);
        }}
      />
    </MyWrapper>
  );
}

const MyWrapper = styled.div``;

const MyProfile = () => {
  return (
    <MyProfileWrapper>
      <div className="my-profile__image">
        <img />
      </div>
      <div className="my-profile__info">
        <h2>당그니당근</h2>
        <div>
          <span>서현 1동</span>
          <span>36.6</span>
        </div>
      </div>
      <div className="my-profile__setting"></div>
    </MyProfileWrapper>
  );
};

const MyProfileWrapper = styled.div`
  display: flex;
  .my-profile {
    &__image {
    }
    &__info {
      h2 {
        ${({ theme }) => theme.font("medium", "bold")}
      }
      &__setting {
      }
    }
  }
`;
