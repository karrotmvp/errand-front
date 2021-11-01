import { useQuery, useInfiniteQuery } from "react-query";
import { GET, PATCH, POST } from "@utils/axios";
import { Errand, ErrandDetailResponseBody, Resume, User } from "@type/response";
import { TabType } from "@type/client";
import { ErrandRegisterRequestBody } from "@type/request";
import { ERREND_REQUEST_SIZE } from "@constant/request";

const getMainErrands = ({ pageParam = 0 }): Promise<Errand[]> => {
  return GET(`/errands?lastId=${pageParam}&size=${ERREND_REQUEST_SIZE}`);
};
const getMyErrands = ({ pageParam = 0 }): Promise<Errand[]> => {
  return GET(`my/errands?lastId=${pageParam}&size=${ERREND_REQUEST_SIZE}`);
};
const getMyHelps = ({ pageParam = 0 }): Promise<Errand[]> => {
  return GET(`my/helps?lastId=${pageParam}&size=${ERREND_REQUEST_SIZE}`);
};

const fetchWrap = (tabType: TabType) => {
  switch (tabType) {
    case "main":
      return getMainErrands;
    case "request":
      return getMyErrands;
    case "help":
      return getMyHelps;
  }
};

export const useErrandList = (tabType: TabType) => {
  return useInfiniteQuery([tabType], fetchWrap(tabType), {
    getNextPageParam: (lastErrans: Errand[]) => {
      const lastErrand = lastErrans[lastErrans.length - 1];
      return lastErrand?.id;
    },
  });
};

export const registerErrand = (requestBody: ErrandRegisterRequestBody) => {
  return POST(`/errands`, requestBody);
};

const getErrandDetail = (id: string): Promise<ErrandDetailResponseBody> => {
  return GET(`/errands/${id}`);
};
export const useErrandDetail = (id: string) => {
  return useQuery(["errandDetail"], () => getErrandDetail(id));
};

const getHelperList = (): Promise<User[]> => {
  return GET(`/errands/:id/helpers`);
};
export const useHelperList = () => {
  return useQuery(["helperList"], () => getHelperList());
};

const getHelperDetail = (
  errandId: number,
  helperId: number
): Promise<Resume> => {
  return GET(`/errands/:${errandId}/helpers/:${helperId}`);
};
export const useHelperDetail = (errandId: number, helperId: number) => {
  return useQuery(["helperDetail", errandId, helperId], () =>
    getHelperDetail(errandId, helperId)
  );
};

export const selectHelper = (errandId: number, helperId: number) => {
  return PATCH(`/errands/:${errandId}/helper`, { helperId });
};

export const confirmIsAppliable = (
  errandId: string
): Promise<{ helperCnt: number; canApply: boolean }> => {
  return GET(`errands/:${errandId}/helper-count`);
};
