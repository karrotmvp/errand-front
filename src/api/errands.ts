import { useQuery } from "react-query";
import { GET, PATCH, POST } from "@utils/axios";
import { Errand, ErrandDetailResponseBody, Resume, User } from "@type/response";
import { ErrandRequestParams } from "@type/client";
import {
  ErrandRegisterRequestBody,
  SelecteHelperRequestBody,
} from "@type/request";

const getErrandList = (lastId: number, size: number = 7): Promise<Errand[]> => {
  return GET(`/errands?lastId=${lastId}&size=${size}`);
};
export const useErrandList = ({ lastId, size }: ErrandRequestParams) => {
  return useQuery(["errandList", lastId, size], () =>
    getErrandList(lastId, size)
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
