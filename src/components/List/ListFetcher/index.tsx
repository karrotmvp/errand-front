import React from "react";
import styled from "@emotion/styled";
import List from "..";
import {
  InfinityScrollType,
  useInfiniteScroll,
} from "@hooks/useInfinityScroll";
import { PullToRefresh } from "@karrotframe/pulltorefresh";
import CustomMixPanel from "@utils/mixpanel";

export default function ListFetcher({
  tabType,
  isAppliable,
  activeTabKey,
}: InfinityScrollType) {
  const {
    status: listStatus,
    data: list,
    isFetchingFirst,
    isFetchingMore,
    fetchTriggerElement,
    refetch: listRefetch,
  } = useInfiniteScroll({ tabType, isAppliable, activeTabKey });

  return (
    <ListFetcherWrapper>
      <PullToRefresh
        onPull={(dispose) => {
          CustomMixPanel.track(CustomMixPanel.eventName.refresh, { tabType });
          listRefetch().then(() => {
            dispose();
          });
        }}
      >
        {listStatus !== "loading" && list && (
          <List
            tabType={tabType}
            list={list}
            fetchTriggerElement={fetchTriggerElement}
            isDoneFetch={!isFetchingFirst && !isFetchingMore}
          />
        )}
      </PullToRefresh>
    </ListFetcherWrapper>
  );
}

const ListFetcherWrapper = styled.div``;
