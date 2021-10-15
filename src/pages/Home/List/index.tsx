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
      <ul>
        {status !== "loading" ? (
          list?.map((item) => <Item {...{ item, tabType }} key={item.id} />)
        ) : (
          <li>로딩 중</li>
        )}
      </ul>
    </ListWrapper>
  );
}

const ListWrapper = styled.section`
  ${({ theme }) => theme.container}
`;
