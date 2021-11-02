import { ErrandStatus, TabType } from "@type/client";
import { Errand } from "@type/response";
import { convertToKRW } from "@utils/convert";
import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { getComparedTime } from "@utils/utils";

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
            <div className="item-info__detail">{item.detail}</div>
            <div className="item-info__sub">
              <span>{item.category.name}</span>
              <span>{item.regionName}</span>
              <span>{getComparedTime(new Date(), item.createdAt)}</span>
            </div>
            <div className="item-info__bottom">
              <div className="item-info__bottom__reward">
                {convertToKRW(item.reward)}
              </div>
              {renderItemStatus(tabType, item)}
            </div>
          </div>
        </div>
      </ItemWrapper>
    </>
  );
}

const ItemWrapper = styled.li`
  padding: 1.4rem 0;
  & + & {
    border-top: 0.1rem solid ${({ theme }) => theme.color.grey6};
  }
  .item-box {
    display: flex;
    position: relative;

    .item-image {
      min-width: 8rem;
      min-height: 8rem;
      img {
        width: 100%;
      }
    }

    .item-info {
      flex: 1;
      margin-left: 1.4rem;
      display: flex;
      flex-direction: column;

      &__detail {
        ${({ theme }) => theme.font("large", "regular")}
        height: 2rem;
        line-height: 1.1;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      &__sub {
        ${({ theme }) => theme.font("small", "regular")}
        color : ${({ theme }) => theme.color.grey4};
        flex: 1;

        & > span + span::before {
          content: " • ";
          margin: 0 0.5rem;
        }
      }

      &__bottom {
        display: flex;
        justify-content: space-between;
        &__reward {
          ${({ theme }) => theme.font("small", "bold")}
        }

        &__status {
          ${({ theme }) => theme.font("small", "medium")}
          &.PRIMARY {
            color: ${({ theme }) => theme.color.primary};
          }
          &.GREY {
            color: ${({ theme }) => theme.color.grey4};
          }
        }
      }
    }
  }
`;

const renderItemStatus = (tabType: TabType, item: Errand) => {
  const { status, helpCount } = item;
  const color = getColor(tabType, status, helpCount);
  const text = getText(tabType, status, helpCount);
  return <div className={`item-info__bottom__status ${color}`}>{text}</div>;
};

const getColor = (
  tabType: TabType,
  status: ErrandStatus,
  helpCount: number
) => {
  if (
    (tabType === "request" && status === "WAIT" && helpCount > 0) ||
    (tabType === "help" && status === "PROCEED")
  ) {
    return "PRIMARY";
  }

  if (
    (tabType === "request" && status === "PROCEED") ||
    (tabType === "main" && status === "WAIT")
  ) {
    return "";
  }

  return "GREY";
};

const getText = (tabType: TabType, status: ErrandStatus, helpCount: number) => {
  if (status === "COMPLETE") {
    return "완료";
  }

  if (status === "WAIT") {
    if (tabType === "help") {
      return "지원완료";
    }
    return `지원 ${helpCount}`;
  }

  if (status === "PROCEED") {
    if (tabType === "main") {
      return "지원마감";
    }
    return "진행중";
  }

  return "매칭실패";
};
