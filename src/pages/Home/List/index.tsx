import React from "react";
import { usePosts } from "../../../api/post";
import { ListFilterType, PostType } from "../../../types/dataType";

interface ListProps {
  listFilter: ListFilterType;
}
export default function List({ listFilter }: ListProps) {
  const { status, data: list } = usePosts(listFilter);

  return (
    <ul>
      {status !== "loading" ? (
        list?.map((item) => <Item item={item} key={item.id} />)
      ) : (
        <div>로딩 중</div>
      )}
    </ul>
  );
}

function Item({ item }: { item: PostType }) {
  return (
    <li>
      <div>{item.title}</div>
      <div>{item.price}</div>
    </li>
  );
}
