import { useQuery, useInfiniteQuery } from "react-query";
import { GET, PATCH, POST } from "@utils/axios";
import { Errand, ErrandDetailResponseBody, Resume, User } from "@type/response";
import { TabType } from "@type/client";
import { ErrandRegisterRequestBody } from "@type/request";
import { ERREND_REQUEST_SIZE } from "@constant/request";
import { getValueFromSearch } from "@utils/utils";

const getMainErrands = async ({ pageParam = null }): Promise<Errand[]> => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(
    `/errands?size=${ERREND_REQUEST_SIZE}&regionId=${regionId}` +
      (pageParam ? `&lastId=${pageParam}` : "")
  );
  return data;
};
const getMyErrands = async ({ pageParam = null }): Promise<Errand[]> => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(
    `my/errands?size=${ERREND_REQUEST_SIZE}&regionId=${regionId}` +
      (pageParam ? `&lastId=${pageParam}` : "")
  );
  return data;
};
const getMyHelps = async ({ pageParam = null }): Promise<Errand[]> => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(
    `my/helps?size=${ERREND_REQUEST_SIZE}&regionId=${regionId}` +
      (pageParam ? `&lastId=${pageParam}` : "")
  );
  return data;
};

const getAppliableErrands = async ({ pageParam = null }): Promise<Errand[]> => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(
    `/errands/appliable?size=${ERREND_REQUEST_SIZE}&regionId=${regionId}` +
      (pageParam ? `&lastId=${pageParam}` : "")
  );
  return data;
};

const switchWrap = (tabType: TabType, isAppliable?: boolean) => {
  if (isAppliable) {
    return getAppliableErrands;
  }

  switch (tabType) {
    case "main":
      return getMainErrands;
    case "request":
      return getMyErrands;
    case "help":
      return getMyHelps;
  }
};

export const useErrandList = (tabType: TabType, isAppliable?: boolean) => {
  return useInfiniteQuery(
    ["getErrands", tabType, isAppliable],
    switchWrap(tabType, isAppliable),
    {
      getNextPageParam: (lastErrans: Errand[]) => {
        const lastErrand = lastErrans[lastErrans.length - 1];
        return lastErrand?.id;
      },
    }
  );
};

export const registerErrand = async (
  requestBody: ErrandRegisterRequestBody
) => {
  const { data } = await POST(`/errands`, requestBody);

  return data;
};

const getErrandDetail = async (
  id: string
): Promise<ErrandDetailResponseBody> => {
  const { data } = await GET(`/errands/${id}`);
  return data;
};
export const useErrandDetail = (id: string) => {
  return useQuery(["errandDetail"], () => getErrandDetail(id));
};

const getHelperList = async (): Promise<User[]> => {
  const { data } = await GET(`/errands/:id/helpers`);
  return data;
};
export const useHelperList = () => {
  return useQuery(["helperList"], () => getHelperList());
};

const getHelperDetail = async (
  errandId: number,
  helperId: number
): Promise<Resume> => {
  const { data } = await GET(`/errands/:${errandId}/helpers/:${helperId}`);
  return data;
};
export const useHelperDetail = (errandId: number, helperId: number) => {
  return useQuery(["helperDetail", errandId, helperId], () =>
    getHelperDetail(errandId, helperId)
  );
};

export const selectHelper = async (errandId: number, helperId: number) => {
  const { data } = await PATCH(`/errands/:${errandId}/helper`, { helperId });
  return data;
};

export const confirmIsAppliable = async (
  errandId: string
): Promise<{ helperCnt: number; canApply: boolean }> => {
  const { data } = await GET(`errands/:${errandId}/helper-count`);
  return data;
};
