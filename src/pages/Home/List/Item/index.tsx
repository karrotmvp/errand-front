import { TabType } from "@type/client";
import { ErrandPreviewResponseBody } from "@type/response";
import { convertToKRW } from "@utils/convert";
import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { getComparedTime } from "@utils/utils";
import { DEFAULT_IMAGE } from "@constant/default";
import { getRefinedFromData } from "@utils/getRefinedFromData";

type ItemProps = {
  item: ErrandPreviewResponseBody;
};

export default function Item({ item }: ItemProps) {
  const { errand } = item;
  const moveTo = usePush(`/errands/${errand.id}`);

  return (
    <>
      <ItemWrapper>
        <div className="item-box" onClick={moveTo}>
          <div className="item-image">
            <img src={errand.thumbnailUrl ?? DEFAULT_IMAGE} alt="img" />
          </div>
          <div className="item-info">
            <div className="item-info__detail">{errand.detail}</div>
            <div className="item-info__sub">
              <span>{errand.category.name}</span>
              <span>{errand.regionName}</span>
              <span>
                {getComparedTime(new Date(), new Date(...errand.createdAt))}
              </span>
            </div>
            <div className="item-info__bottom">
              <div className="item-info__bottom__reward">
                {convertToKRW(errand.reward)}
              </div>
              {item && renderItemStatus(item)}
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

      max-width: 8rem;
      max-height: 8rem;

      width: 8rem;
      height: 8rem;

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
        height: 1em;
        line-height: 1;
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

const renderItemStatus = (item: ErrandPreviewResponseBody) => {
  const refined = getRefinedFromData(item);
  return (
    <div className={`item-info__bottom__status ${refined.color}`}>
      {refined.statusText}
    </div>
  );
};
