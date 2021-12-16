import { getMyErrandPreviews, getMyHelpPreviews } from "@api/my";
import { KEYS } from "@constant/reactQuery";
import { ERREND_REQUEST_SIZE } from "@constant/request";
import { InfinityScrollType } from "@hooks/useInfinityScroll";
import { TabType } from "@type/client";
import { ErrandPreviewResponseBody } from "@type/response";
import { GET } from "@utils/axios";
import { getValueFromSearch } from "@utils/utils";
import { useInfiniteQuery } from "react-query";

const useErrands = ({
  tabType,
  activeTabKey,
  isAppliable,
  options,
}: InfinityScrollType) => {
  return useInfiniteQuery(
    [KEYS.ERRNDS, tabType, isAppliable, activeTabKey],
    switchWrap(tabType, isAppliable),
    {
      getNextPageParam: (lastErrans: ErrandPreviewResponseBody[]) => {
        const lastErrand = lastErrans[lastErrans.length - 1];
        return lastErrand?.errand?.id;
      },
      ...options,
    }
  );
};

const getMainErrandPreviews = async ({
  pageParam = null,
}): Promise<ErrandPreviewResponseBody[]> => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(
    `/errands?size=${ERREND_REQUEST_SIZE}&regionId=${regionId}` +
      (pageParam ? `&lastId=${pageParam}` : "")
  );
  return data;
};

const getAppliableErrandPreviews = async ({
  pageParam = null,
}): Promise<ErrandPreviewResponseBody[]> => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(
    `/errands/appliable?size=${ERREND_REQUEST_SIZE}&regionId=${regionId}` +
      (pageParam ? `&lastId=${pageParam}` : "")
  );
  return data;
};

const switchWrap = (tabType: TabType, isAppliable?: boolean) => {
  if (isAppliable) {
    return getAppliableErrandPreviews;
  }

  switch (tabType) {
    case "main":
      return getMainErrandPreviews;
    case "request":
      return getMyErrandPreviews;
    case "help":
      return getMyHelpPreviews;
  }
};

export default useErrands;
