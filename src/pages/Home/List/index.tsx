import styled from "@emotion/styled";
import { ListFilterType } from "@type/dataType";
import { usePosts } from "@api/post";
import Item from "./Item";

interface ListProps {
  listFilter: ListFilterType;
}
export default function List({ listFilter }: ListProps) {
  const { status, data: list } = usePosts(listFilter);

  return (
    <ListWrapper>
      {status !== "loading" ? (
        list?.map((item) => <Item {...{ item, listFilter }} key={item.id} />)
      ) : (
        <div>로딩 중</div>
      )}
    </ListWrapper>
  );
}

const ListWrapper = styled.ul`
  ${({ theme }) => theme.container}
`;
