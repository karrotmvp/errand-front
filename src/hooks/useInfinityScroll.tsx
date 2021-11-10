import { useErrands } from "@api/errands";
import { TabType } from "@type/client";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useInfiniteScroll = (
  tabType: TabType,
  activeTabKey: string,
  isAppliable?: boolean
) => {
  const query = useErrands(tabType, activeTabKey, isAppliable);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });
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
    refetch: query.refetch,
  };
};
