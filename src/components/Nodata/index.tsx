import styled from "@emotion/styled";
import Button from "@components/Button";
import { TabType } from "@type/client";
import usePush from "@hooks/usePush";
import NodataImage from "@assets/images/no-data.png";
import { useNavigator } from "@karrotframe/navigator";
import CustomMixPanel from "@utils/mixpanel";

type NoDataProps = {
  tabType: TabType;
};

export default function NoData({ tabType }: NoDataProps) {
  const { pop } = useNavigator();
  const moveToErrandRequestForm = usePush("/errand-request?categoryId=0");

  const handleClick = () => {
    if (tabType === "main" || tabType === "request") {
      CustomMixPanel.track(CustomMixPanel.eventName.clickETC, {
        page: tabType === "main" ? "홈" : "마이",
      });
      moveToErrandRequestForm();
    } else {
      pop().send({ isAppliable: true });
      CustomMixPanel.track(CustomMixPanel.eventName.clickETC, {
        page: "마이",
        clickTarget: '지원 가능한 심부름 보러가기'
      });
    }
  };

  return (
    <NoDataWrapper>
      {renderText(tabType)}
      {tabType === "main" && (
        <div className="no-data__image">
          <img src={NodataImage} alt="nodata" />
        </div>
      )}
      <Button
        size="small"
        buttonType="outline"
        color="primary"
        minWidth="21rem"
        rounded
        onClick={handleClick}
      >
        {tabType === "help" ? "지원 가능한 심부름 보기" : "심부름 등록하기"}
      </Button>
    </NoDataWrapper>
  );
}

const renderText = (tabType: TabType) => {
  switch (tabType) {
    case "main":
      return (
        <p>
          해당 지역에는 아직 등록된 심부름이 없어요.
          <br /> 필요한 심부름을 먼저 등록해보세요.
        </p>
      );
    case "request":
      return (
        <p>
          신청한 심부름이 없어요. <br />
          필요한 심부름을 등록해보세요.
        </p>
      );
    case "help":
      return (
        <p>
          지원한 내역이 없어요.
          <br />
          지원 가능한 심부름을 확인해보세요.
        </p>
      );
    default:
      return <p></p>;
  }
};

const NoDataWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 15rem;

  & > p {
    ${({ theme }) => theme.font("medium", "regular")}
    color: ${({ theme }) => theme.color.grey4};
    text-align: center;

    margin-bottom: 1.7rem;
  }

  & > .no-data__image {
    margin-bottom: 3rem;
  }
`;
