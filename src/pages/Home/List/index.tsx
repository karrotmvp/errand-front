import styled from "@emotion/styled";
import { TabType } from "@type/client";
import { useErrandList } from "@api/errand";
import Item from "./Item";

interface ListProps {
  tabType: TabType;
}
export default function List({ tabType }: ListProps) {
  const { status, data: list } = useErrandList(tabType);

  return (
    <ListWrapper>
      {status !== "loading" ? (
        list?.map((item) => <Item {...{ item, tabType }} key={item.id} />)
      ) : (
        <div>로딩 중</div>
      )}
    </ListWrapper>
  );
}

const ListWrapper = styled.ul`
  ${({ theme }) => theme.container}
`;
