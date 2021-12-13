import React, { useEffect } from "react";
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
  const { push, replace, pop } = useNavigator();

  useEffect(() => {
    const depth = localStorage.getItem("depth");
    if (depth === "0") {
      CustomMixPanel.track(CustomMixPanel.eventName.fromFeed, {
        page: "배너",
      });
    }
  }, []);

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
          <>
            <Button
              buttonType="contained"
              size="small"
              color="primary"
              fullWidth
              rounded
              onClick={() => {
                CustomMixPanel.track(
                  CustomMixPanel.eventName.clickBannerButton,
                  {
                    page: "배너",
                    clickTarget: "심부름 부탁하러 가기",
                  }
                );
                push("/errand-request?categoryId=0");
              }}
            >
              심부름 부탁하러 가기
            </Button>
            <Button
              buttonType="contained"
              size="small"
              color="grey"
              fullWidth
              rounded
              onClick={() => {
                CustomMixPanel.track(
                  CustomMixPanel.eventName.clickBannerButton,
                  {
                    page: "배너",
                    clickTarget: "당근심부름 메인페이지 구경하기",
                  }
                );
                localStorage.getItem("depth") === "0" ? replace("/") : pop();
              }}
            >
              당근심부름 메인페이지 구경하기
            </Button>
          </>
        }
      />
      <ul className="event-page__info">
        <li>
          당근심부름은 동네 이웃이 필요한 심부름을 부탁하고, 도와주는
          서비스에요. 금전/물품을 요구하거나 무료로 재능 기부를 요구하는 글은
          올릴 수 없어요.
        </li>
        <li>심부름 요청글을 작성하면 이벤트 참여가 완료돼요.</li>
        <li>
          이벤트는 4일간(2021년 12월 15일 종료) 진행되며, 리워드 지급 시점에
          심부름이 삭제됐을 경우 이벤트 대상에서 제외될 수 있어요.
        </li>
        <li>
          {
            "리워드는 이벤트 종료 후 일괄 지급되며, 나의 당근 > 친구초대에서 확인하실 수 있어요."
          }
        </li>
        <li>
          아이디당 한 번의 이벤트만 참여가 가능하며 리워드는 100% 전원 증정해
          드려요.
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
