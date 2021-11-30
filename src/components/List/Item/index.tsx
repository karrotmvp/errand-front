import { ErrandPreviewResponseBody } from "@type/response";
import { convertToKRW } from "@utils/convert";
import styled from "@emotion/styled";
import usePush from "@hooks/usePush";
import { getComparedTime } from "@utils/utils";
import { DEFAULT_THUMBNAIL } from "@constant/default";
import { getRefinedFromData } from "@utils/getRefinedFromData";
import CustomMixPanel from "@utils/mixpanel";

type ItemProps = {
  item: ErrandPreviewResponseBody;
};

export default function Item({ item }: ItemProps) {
  const { errand } = item;
  const moveTo = usePush(`/errands/${errand.id}`);

  return (
    <>
      <ItemWrapper>
        <div
          className="item-box"
          onClick={() => {
            CustomMixPanel.track(CustomMixPanel.eventName.clickETC, {
              clickTarget: "상세 페이지로 이동",
              detailId: errand.id,
            });
            moveTo();
          }}
        >
          <Thumbnail url={errand.thumbnailUrl ?? DEFAULT_THUMBNAIL} />
          <div className="item-info">
            <div className="item-info__detail">{errand.detail}</div>
            <div className="item-info__sub">
              <span>{errand.category.name}</span>
              <span>{errand.regionName}</span>
              <span>
                {getComparedTime(new Date(), new Date(errand.createdAt))}
              </span>
            </div>
            <div className="item-info__reward">
              {convertToKRW(errand.reward)}
            </div>
            <div className="item-info__bottom">
              <div className="item-info__bottom__reward"></div>
              {item && renderItemStatus(item)}
            </div>
          </div>
        </div>
      </ItemWrapper>
    </>
  );
}

const Thumbnail = styled.div<{ url: string }>`
  min-width: 10rem;
  min-height: 10rem;

  max-width: 10rem;
  max-height: 10rem;

  width: 10rem;
  height: 10rem;

  overflow: hidden;
  border-radius: 0.8rem;
  background-image: url(${({ url }) => url});
  background-size: cover;
`;

const ItemWrapper = styled.li`
  padding: 1.8rem 0;
  &:not(:first-of-type) {
    border-top: 0.15rem solid ${({ theme }) => theme.color.grey8};
  }
  .item-box {
    display: flex;
    position: relative;

    .item-info {
      flex: 1;
      margin-left: 1.4rem;
      display: flex;
      flex-direction: column;

      &__detail {
        ${({ theme }) => theme.font("large", "medium")}
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-wrap: break-word;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      &__sub {
        ${({ theme }) => theme.font("xsmall", "regular")}
        color : ${({ theme }) => theme.color.grey4};
        margin-top: 0.3rem;

        & > span + span::before {
          content: " • ";
          margin: 0 0.5rem;
        }
      }
      &__reward {
        flex: 1;
        margin-top: 0.6rem;

        ${({ theme }) => theme.font("large", "regular")}
      }
      &__bottom {
        display: flex;
        justify-content: space-between;
        &__reward {
          ${({ theme }) => theme.font("small", "bold")}
        }

        &__status {
          ${({ theme }) => theme.font("xsmall", "regular")}
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
