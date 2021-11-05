import { useQuery, useInfiniteQuery } from "react-query";
import { DELETE, GET, PATCH, POST } from "@utils/axios";
import {
  ErrandPreviewResponseBody,
  ErrandDetailResponseBody,
  Resume,
  User,
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
  id: number
): Promise<ErrandDetailResponseBody> => {
  const { data } = await GET(`/errand/${id}`);
  return data;
};
export const useErrandDetail = (id: number) => {
  return useQuery(["errandDetail"], () => getErrandDetail(id));
};

const getHelperList = async (): Promise<User[]> => {
  const { data } = await GET(`/errand/:id/helpers`);
  return data;
};
export const useHelperList = () => {
  return useQuery(["helperList"], () => getHelperList());
};

const getHelperDetail = async (
  errandId: number,
  helperId: number
): Promise<Resume> => {
  const { data } = await GET(`/errand/:${errandId}/helpers/:${helperId}`);
  return data;
};
export const useHelperDetail = (errandId: number, helperId: number) => {
  return useQuery(["helperDetail", errandId, helperId], () =>
    getHelperDetail(errandId, helperId)
  );
};

export const selectHelper = async (errandId: number, helperId: number) => {
  const { data } = await PATCH(`/errand/:${errandId}/helper`, { helperId });
  return data;
};

export const finishErrand = async (errandId: number) => {
  const { data } = await PATCH(`/errand/:${errandId}/complete`);
  return data;
};

export const confirmIsAppliable = async (
  errandId: string
): Promise<{ helperCnt: number; canApply: boolean }> => {
  const { data } = await GET(`/errand/:${errandId}/helper-count`);
  return data;
};

export const deleteMyErrand = async (errandId: string) => {
  const { data } = await DELETE(`/errand/:${errandId}`);
  return data;
};
