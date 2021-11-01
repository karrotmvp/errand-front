import { useErrandList } from "@api/errands";
import { TabType } from "@type/client";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useInfiniteScroll = (tabType: TabType) => {
  const query = useErrandList(tabType);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && query.hasNextPage) {
      query.fetchNextPage();
    }
  }, [query, inView]);

  return {
    status: query.status,
    data: query.data,
    isFetchingFirst: query.isFetching && !query.hasNextPage,
    isFetchingMore: query.isFetching,
    fetchTriggerElement: <div ref={ref}></div>,
  };
};
