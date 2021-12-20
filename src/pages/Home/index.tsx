import { Check, Gear, Me, Plus } from "@assets/icon";
import CustomScreenHelmet from "@components/CustomScreenHelmet";
import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { useNavigator } from "@karrotframe/navigator";
import { getRegion } from "@utils/utils";
import { useState } from "react";
import List from "@components/List";
import CustomMixPanel from "@utils/mixpanel";
import ToolTip from "@components/ToolTip";
import { useTooltip } from "@hooks/useTooltip";
import { BannerImage } from "@assets/images";
// import Slider from "react-slick";
import { css } from "@emotion/react";
import useCurrentData from "@api/errands/useCurrentData";
import { PullToRefresh } from "@karrotframe/pulltorefresh";
import { useInfiniteScroll } from "@hooks/useInfinityScroll";

export default function Home() {
  const moveToErrandRequestForm = usePush("/errand-request?categoryId=0");
  const [showTooltip, closeTooltip] = useTooltip("home");
  const [isAppliable, setIsAppliable] = useState<boolean>(false);
  const { status: currentDataStatus, data: currentData } = useCurrentData();
  const {
    status: listStatus,
    data: list,
    isFetchingFirst,
    isFetchingMore,
    fetchTriggerElement,
    refetch: listRefetch,
  } = useInfiniteScroll({ tabType: "main", isAppliable });

  const region = getRegion();
  const { push } = useNavigator();

  const toggleIsAppliable = () => {
    setIsAppliable((current) => !current);
  };
  const handleClickBanner = () => {
    push("/description");
    CustomMixPanel.track(CustomMixPanel.eventName.clickBanner, {
      page: "홈",
      clickTarget: "커피 이벤트",
    });
  };

  return (
    <>
      <CustomScreenHelmet
        title={
          <Title>
            <h1>당근심부름</h1>
            <span>Beta</span>
          </Title>
        }
        appendRight={RightAppender(setIsAppliable)}
      />
      <HomeWrapper>
        <ContentWrapper>
          <PullToRefresh
            onPull={(dispose) => {
              CustomMixPanel.track(CustomMixPanel.eventName.refresh, {
                tabType: "main",
              });
              listRefetch().then(() => {
                dispose();
              });
            }}
          >
            <div onClick={handleClickBanner}>
              <img src={BannerImage} alt="banner" />
            </div>
            <div className="home__container">
              <div className="home__panel">
                <span>🥕</span>
                {/* <Slider
              {...{
                infinite: true,
                autoplay: true,
                autoplaySpeed: 3500,
                vertical: true,
                arrows: false,
              }}
            > */}
                <div className="home__panel__text">
                  현재&nbsp;
                  <span>
                    {currentDataStatus === "success"
                      ? currentData?.userAlarmOnCnt
                      : 0}
                  </span>
                  명이 당근심부름 알림을 받고 있어요.
                </div>
                {/* </Slider> */}
              </div>
              <div className="home__top">
                <div className="home__top__location">
                  <h2>
                    <span>{region}</span> 주변
                  </h2>
                </div>
                <div
                  className={`home__top__check ${
                    isAppliable ? "primary" : "grey"
                  }`}
                  onClick={toggleIsAppliable}
                >
                  <Check />
                  <div>지원가능한 심부름 보기</div>
                </div>
              </div>
            </div>

            <div className="home__list-wrapper">
              {listStatus !== "loading" && list && (
                <List
                  tabType="main"
                  list={list}
                  fetchTriggerElement={fetchTriggerElement}
                  isDoneFetch={!isFetchingFirst && !isFetchingMore}
                />
              )}
            </div>
          </PullToRefresh>
        </ContentWrapper>
        <FixedWrapper>
          <div className="fixed__tooltip">
            {showTooltip && (
              <ToolTip
                text="이웃에게 심부름을 부탁해 보세요."
                closeTooltip={closeTooltip}
                verticalTail="down"
                horizontalTail="right"
              />
            )}
          </div>
          <div
            className="fixed__fab"
            onClick={() => {
              moveToErrandRequestForm();
              CustomMixPanel.track(CustomMixPanel.eventName.clickETC, {
                page: "홈",
                clickTarget: "요청하기",
              });
            }}
          >
            <button>
              <Plus stroke="white" />
            </button>
          </div>
        </FixedWrapper>
      </HomeWrapper>
    </>
  );
}

export const Title = styled.div`
  display: flex;
  align-items: flex-end;

  & > span {
    color: ${({ theme }) => theme.color.primary};
    font-size: 1.2rem;
    font-weight: 500;
    margin-left: 0.5rem;
  }
`;

const HomeWrapper = styled.main`
  height: 100%;
  position: relative;

  .home {
  }
`;
const ContentWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;

  .home {
    &__container {
      ${({ theme }) => theme.container}
    }
    &__panel {
      ${({ theme }) =>
        css`
          ${theme.font("small", "regular")}
        `}
      display: flex;
      align-items: center;
      background: #ffebe2;
      padding: 1.1rem 1.4rem;
      border-radius: 0.8rem;
      margin-top: 1rem;

      & > span {
        margin-right: 1.5rem;
        ${({ theme }) => theme.font("large", "regular")}
      }
      &__text {
        & > span {
          color: ${({ theme }) => theme.color.primary};
          ${({ theme }) => theme.font("small", "bold")}
        }
      }
    }
    &__top {
      margin-top: 2rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__location {
        font-size: 1.7rem;
        font-weight: 700;

        display: flex;
        align-items: center;
        & > h2 {
          font-family: Cafe24Ssurround;
          & > span {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
      &__check {
        display: flex;
        align-items: center;
        & > div {
          margin-left: 0.5rem;
          ${({ theme }) => theme.font("small", "medium")};
          margin-bottom: 0.3rem;
        }
        &.primary {
          color: ${({ theme }) => theme.color.primary};
          & > svg {
            fill: ${({ theme }) => theme.color.primary};
            stroke: white;
          }
        }
        &.grey {
          color: ${({ theme }) => theme.color.grey4};
          & > svg {
            fill: ${({ theme }) => theme.color.grey8};
            stroke: ${({ theme }) => theme.color.grey6};
          }
        }
      }
    }

    &__list-wrapper {
      height: 100%;
    }
  }
`;

const FixedWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 9999;
  .fixed__tooltip {
    padding-right: 2rem;
  }
  .fixed__fab {
    padding: 0rem 3rem 3rem 1rem;
    & > button {
      width: 5.7rem;
      height: 5.7rem;
      background: ${({ theme }) => theme.color.primary};
      border-radius: 3rem;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const RightAppender = (
  setIsAppliable: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { push } = useNavigator();
  const moveToAlarm = () => {
    CustomMixPanel.track(CustomMixPanel.eventName.clickETC, {
      clickTarget: "알람설정으로 이동",
    });
    push("/alarm");
  };

  const moveToMy = async () => {
    CustomMixPanel.track(CustomMixPanel.eventName.clickETC, {
      clickTarget: "마이페이지로 이동",
    });
    const data = await push<{ isAppliable: boolean }>("/my");
    data && setIsAppliable(data.isAppliable);
  };

  return (
    <AppenderWrapper>
      <div onClick={moveToMy}>
        <Me />
      </div>
      <div onClick={moveToAlarm}>
        <Gear />
      </div>
    </AppenderWrapper>
  );
};

export const AppenderWrapper = styled.div`
  display: flex;

  & > div {
    display: flex;
    align-items: center;
    padding: 1rem;
  }
  & > div + div {
    margin-left: 0rem;
  }
`;
