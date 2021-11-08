import { useQuery, useInfiniteQuery } from "react-query";
import { DELETE, GET, PATCH, POST } from "@utils/axios";
import {
  ErrandPreviewResponseBody,
  ErrandDetailResponseBody,
  Resume,
  Helper,
} from "@type/response";
import { TabType } from "@type/client";
import { ERREND_REQUEST_SIZE } from "@constant/request";
import { getValueFromSearch } from "@utils/utils";
import { getMyErrandPreviews, getMyHelpPreviews } from "./my";

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

export const useErrandList = (tabType: TabType, isAppliable?: boolean) => {
  return useInfiniteQuery(
    ["getErrands", tabType, isAppliable],
    switchWrap(tabType, isAppliable),
    {
      getNextPageParam: (lastErrans: ErrandPreviewResponseBody[]) => {
        const lastErrand = lastErrans[lastErrans.length - 1];
        return lastErrand?.errand?.id;
      },
    }
  );
};

export const registerErrand = async (requestBody: FormData) => {
  const { data } = await POST(`/errand`, requestBody);

  return data;
};

const getErrandDetail = async (
  errandId: string
): Promise<ErrandDetailResponseBody> => {
  const { data } = await GET(`/errand/${errandId}`);
  return data;
};
export const useErrandDetail = (errandId: string) => {
  return useQuery(["errandDetail"], () => getErrandDetail(errandId));
};

const getHelperList = async (errandId: string): Promise<Helper[]> => {
  const { data } = await GET(`/errand/${errandId}/helpers`);
  return data;
};
export const useHelperList = (errandId: string) => {
  return useQuery(["helperList"], () => getHelperList(errandId));
};

const getHelperDetail = async (helpId: string): Promise<Resume> => {
  const { data } = await GET(`/help/${helpId}`);
  return data;
};
export const useHelperDetail = (helpId: string) => {
  return useQuery(["helperDetail", helpId], () => getHelperDetail(helpId));
};

export const selectHelper = async (errandId: string, applierId: string) => {
  const { data } = await PATCH(`/errand/${errandId}/helper`, { applierId });
  return data;
};

export const finishErrand = async (errandId: string) => {
  const { status } = await PATCH(`/errand/${errandId}/complete`);
  return status;
};

export const confirmIsAppliable = async (
  errandId: string
): Promise<{ helperCnt: number; canApply: boolean }> => {
  const { data } = await GET(`/errand/${errandId}/helper-count`);
  return data;
};

export const deleteMyErrand = async (errandId: string) => {
  const { status } = await DELETE(`/errand/${errandId}`);
  return status;
};
