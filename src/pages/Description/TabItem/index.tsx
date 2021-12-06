import React from "react";
import styled from "@emotion/styled";

type TabItemProps = {
  imgURL: string;
  button: React.ReactNode;
};

export default function TabItem({ imgURL, button }: TabItemProps) {
  return (
    <TabItemWrapper>
      <div>
        <img src={imgURL} alt="이벤트 이미지" />
        <div className="container">{button}</div>
      </div>
    </TabItemWrapper>
  );
}

const TabItemWrapper = styled.div`
  .container {
    ${({ theme }) => theme.container}
  }
`;
