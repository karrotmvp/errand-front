import { useQuery, useInfiniteQuery } from "react-query";
import { GET, PATCH, POST } from "@utils/axios";
import { Errand, ErrandDetailResponseBody, Resume, User } from "@type/response";
import { ErrandRequestParams } from "@type/client";
import {
  ErrandRegisterRequestBody,
  SelecteHelperRequestBody,
} from "@type/request";
import { ERREND_REQUEST_SIZE } from "@constant/request";

const getErrandList = (lastId = 0): Promise<Errand[]> => {
  return GET(`/errands?lastId=${lastId}&size=${ERREND_REQUEST_SIZE}`);
};

export const useErrandList = ({ lastId }: ErrandRequestParams) => {
  return useInfiniteQuery(
    ["errandList", lastId],
    ({ pageParam = 0 }): Promise<Errand[]> => {
      return GET(`/errands?lastId=${lastId}&size=${ERREND_REQUEST_SIZE}`);
    },
    {
      getNextPageParam: (lastErrans: Errand[]) => {
        const lastErrand = lastErrans[lastErrans.length - 1];
        return lastErrand.id ?? false;
      },
    }
  );
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

const getHelperDetail = (errandId: number, userId: number): Promise<Resume> => {
  return GET(`/errands/:${errandId}/helpers/:${userId}`);
};
export const useHelperDetail = (errandId: number, userId: number) => {
  return useQuery(["helperDetail"], () => getHelperDetail(errandId, userId));
};

export const selectHelper = (requestBody: SelecteHelperRequestBody) => {
  return PATCH(`/errands/:id/helper`, requestBody);
};

export const confirmIsAppliable = (
  errandId: string
): Promise<{ helperCnt: number; canApply: boolean }> => {
  return GET(`errands/:${errandId}/helper-count`);
};
