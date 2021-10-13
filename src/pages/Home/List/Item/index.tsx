import { PostType, ListFilterType } from "@type/dataType";
import { convertToKRW } from "@utils/convert";
import styled from "@emotion/styled";

interface ItemProps {
  item: PostType;
  listFilter: ListFilterType;
}

export default function Item({ item, listFilter }: ItemProps) {
  return (
    <ItemWrapper>
      <div className="item-image">
        <img src={item.imgSrc} alt="img" />
      </div>
      <div className="item-info">
        <div className="item-info__title">{item.title}</div>
        <div className="item-info__price">{convertToKRW(item.price)}</div>
      </div>
    </ItemWrapper>
  );
}

const ItemWrapper = styled.li`
  display: flex;
  padding: 1.4rem 0;
  & + & {
    border-top: 0.1rem solid ${({ theme }) => theme.color.grey2};
  }
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
      ${({ theme }) => theme.font.size.medium};
      font-weight: ${({ theme }) => theme.font.weight.medium};
    }
    &__price {
      ${({ theme }) => theme.font.size.medium};
      font-weight: ${({ theme }) => theme.font.weight.bold};
    }
  }
`;
