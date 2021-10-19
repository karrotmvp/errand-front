import { ErrandStatus, TabType } from "@type/client";
import { Errand } from "@type/response";
import { convertToKRW } from "@utils/convert";
import styled from "@emotion/styled";
import ItemFooter from "./ItemFooter";
import usePush from "@hooks/usePush";

type ItemProps = {
  item: Errand;
  tabType: TabType;
};

export default function Item({ item, tabType }: ItemProps) {
  const moveTo = usePush(`/errands/${item.id}`);

  return (
    <>
      <ItemWrapper>
        <div className="item-box" onClick={moveTo}>
          <div className="item-image">
            <img src={item.thumbnailUrl} alt="img" />
          </div>
          <div className="item-info">
            <div className="item-info__title">{item.title}</div>
            <div className="item-info__reward">{convertToKRW(item.reward)}</div>
            {renderItemStatus(tabType, item.status)}
          </div>
        </div>
        {tabType === "request" && (
          <ItemFooter
            {...{
              status: item.status,
              helper: item?.selectedHelper,
            }}
          />
        )}
      </ItemWrapper>
    </>
  );
}

// const renderItemStatus = ({ status }) => {};

const ItemWrapper = styled.li`
  padding: 1.4rem 0;
  & + & {
    border-top: 0.1rem solid ${({ theme }) => theme.color.grey2};
  }
  .item-box {
    display: flex;
    position: relative;

    .item-image {
      width: 8rem;
      height: 8rem;
      img {
        width: 100%;
      }
    }

    .item-info {
      margin-left: 1.4rem;
      &__title {
        ${({ theme }) => theme.font("medium")}
      }
      &__reward {
        ${({ theme }) => theme.font("medium", "bold")}
      }
      &__status {
        ${({ theme }) => theme.font("small", "medium")}
        color: ${({ theme }) => theme.color.grey3};

        position: absolute;
        right: 0;
        bottom: 0;
        &.wait {
          color: ${({ theme }) => theme.color.primary};
        }
        &.proceed {
          color: ${({ theme }) => theme.color.secondary};
        }
        &.complete {
          color: ${({ theme }) => theme.color.grey3};
        }
        &.fail {
          color: ${({ theme }) => theme.color.fail};
        }
      }
    }
  }
`;

const HELP_ITEM_STATUS = {
  wait: "지원완료",
  proceed: "현재 수행중",
  complete: "완료",
  fail: "매칭실패",
};

const renderItemStatus = (tabType: TabType, status: ErrandStatus) => {
  switch (tabType) {
    case "help":
      return (
        <div className={`item-info__status ${status}`}>
          {HELP_ITEM_STATUS[status]}
        </div>
      );
    case "request":
      return status === "complete" ? (
        <div className={`item-info__status ${status}`}>완료</div>
      ) : (
        <></>
      );
    default:
      return <></>;
  }
};
