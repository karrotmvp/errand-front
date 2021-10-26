import styled from "@emotion/styled";
import { TabType } from "@type/client";
import { ERREND_REQUEST_SIZE } from "@constant/request";
import { useErrandList } from "@api/errands";
import Item from "./Item";

type ListProps = {
  tabType: TabType;
};

export default function List({ tabType }: ListProps) {
  const {
    status,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useErrandList({
    lastId: 0,
  });

  return (
    <ListWrapper>
      <ul>
        {status === "loading" ? (
          <li>로딩 중</li>
        ) : status === "error" ? (
          <li>에뤄</li>
        ) : (
          data?.pages?.map((group, i) =>
            group.map((item) => <Item {...{ item, tabType }} key={item.id} />)
          )
        )}
      </ul>
    </ListWrapper>
  );
}

const ListWrapper = styled.section`
  ${({ theme }) => theme.container};
`;
