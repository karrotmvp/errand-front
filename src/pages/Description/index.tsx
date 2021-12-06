import React from "react";
import styled from "@emotion/styled";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import { Title } from "@pages/Home";
import TabItem from "./TabItem";
import { BannerDetail } from "@assets/images";
import { useNavigator } from "@karrotframe/navigator";
import Button from "@components/Button";
import { css } from "@emotion/react";
import CustomMixPanel from "@utils/mixpanel";

export default function Description() {
  const { push } = useNavigator();
  return (
    <DescriptionWrapper>
      <CustomScreenHelmet
        title={
          <Title>
            <h1>당근심부름</h1>
            <span>Beta</span>
          </Title>
        }
      />
      <TabItem
        imgURL={BannerDetail}
        button={
          <Button
            buttonType="contained"
            size="small"
            color="primary"
            fullWidth
            rounded
            onClick={() => {
              CustomMixPanel.track(CustomMixPanel.eventName.clickBannerButton, {page: '배너'});
              push(
                "/errand-request?categoryId=3&reward=3000&detail=안녕하세요! 붕어빵 사다주실 수 있나요?"
              );
            }}
          >
            나도 붕어빵 부탁하러 가기
          </Button>
        }
      />
      <ul className="event-page__info">
        <li>
          당근심부름은 동네 이웃이 필요한 심부름을 부탁하고, 도와주는
          서비스에요. 금전/물품을 요구하거나 무료로 재능 기부를 요구하는 글은
          올릴 수 없어요.
        </li>
        <li>
          아이디당 한 번의 이벤트만 참여가 가능하며 리워드는 100% 전원 증정해
          드려요.
        </li>
        <li>
          이벤트는 4일간 (2021년 12월 6일 종료) 진행되며 리워드 지급 시점에
          심부름이 삭제됐을 경우 이벤트 대상에서 제외될 수 있어요.
        </li>
      </ul>
    </DescriptionWrapper>
  );
}

const DescriptionWrapper = styled.div`
  .event-page__info {
    ${({ theme }) => css`
      ${theme.font("small", "regular")}
      ${theme.container}
      color : ${theme.color.grey5}
    `}

    margin: 1.5rem 0 2.7rem 0;
    & > li {
      &:not(:first-of-type) {
        margin-top: 0.3rem;
      }
      &::before {
        content: " • ";
        margin-right: 0.5rem;
      }
    }
  }
`;
