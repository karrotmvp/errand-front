import styled from "@emotion/styled";
import { TabType } from "@type/client";
import Item from "./Item";
import { useInfiniteScroll } from "@hooks/useInfinityScroll";
import NoData from "@components/Nodata";

type ListProps = {
  tabType: TabType;
  isAppliable?: boolean;
};

export default function List({ tabType, isAppliable }: ListProps) {
  const { status, data, isFetchingFirst, isFetchingMore, fetchTriggerElement } =
    useInfiniteScroll(tabType, isAppliable);
  console.log(1, data?.pages[0]);

  return (
    <ListWrapper>
      <ul>
        {status === "loading" ? (
          <li>로딩 중</li>
        ) : status === "error" ? (
          <li>에뤄</li>
        ) : data?.pages[0].length === 0 ? (
          <NoData tabType={tabType} />
        ) : (
          data?.pages?.map((group) =>
            group?.map((item) => <Item {...{ item, tabType }} key={item.id} />)
          )
        )}
        {!isFetchingFirst && !isFetchingMore && fetchTriggerElement}
      </ul>
    </ListWrapper>
  );
}

const ListWrapper = styled.section`
  ${({ theme }) => theme.container};
`;
