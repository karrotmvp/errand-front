import styled from "@emotion/styled";
import Button from "@components/Button";
import { TabType } from "@type/client";
import usePush from "@hooks/usePush";
import NodataImage from "@assets/images/no-data.png";
import { useNavigator } from "@karrotframe/navigator";

type NoDataProps = {
  tabType: TabType;
};

export default function NoData({ tabType }: NoDataProps) {
  const { pop } = useNavigator();
  const moveToApplyForm = usePush("/errand-request");

  const handleClick = () => {
    if (tabType === "main" || tabType === "request") {
      moveToApplyForm();
    } else {
      pop().send({ isAppliable: true });
    }
  };

  return (
    <NoDataWrapper>
      {renderText(tabType)}
      <div className="no-data__image">
        <img src={NodataImage} alt="nodata" />
      </div>
      <Button
        buttonType="outline"
        color="primary"
        width="21rem"
        rounded
        onClick={handleClick}
      >
        {tabType === "help" ? "지원 가능한 심부름 보기" : "심부름 등록"}
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
          <br /> 심부름을 등록해 볼까요?
        </p>
      );
    case "request":
      return (
        <p>
          신청하신 심부름이 없어요. <br />
          필요한 심부름이 있다면 등록해보세요.
        </p>
      );
    case "help":
      return (
        <p>
          지원한 내역이 없어요.
          <br />
          도움이 필요한 사람에게 도움을 줘볼까요?
        </p>
      );
    default:
      return (
        <p>
          신청하신 심부름이 없어요.
          <br /> 필요한 심부름이 있다면 등록해보세요.
        </p>
      );
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
    width: 40%;
    margin-bottom: 3rem;

    & > img {
      width: 100%;
    }
  }
`;
