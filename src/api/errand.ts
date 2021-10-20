import { useQuery } from "react-query";
import { GET, PATCH, POST } from "@utils/axios";
import { Errand, ErrandDetail, Resume, User } from "@type/response";
import { ErrandRequestParams, TabType } from "@type/client";
import {
  ErrandRegisterRequestBody,
  SelecteHelperRequestBody,
} from "@type/request";

const getErrandList = (
  lastId: number,
  size: number,
  filter?: TabType
): Promise<Errand[]> => {
  const query =
    `?lastId=${lastId}&size=${size}` +
    `/errands${filter !== "main" ? `?filter=${filter}` : ""}`;
  return GET(`/errands${query}`);
};
export const useErrandList = ({
  lastId,
  size,
  filter,
}: ErrandRequestParams) => {
  return useQuery(["errandList", lastId, size, filter], () =>
    getErrandList(lastId, size, filter)
  );
};

const getErrandDetail = (id: string): Promise<ErrandDetail> => {
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

const getHelperDetail = (): Promise<Resume> => {
  return GET(`/errands/:id/helpers/:id`);
};
export const useHelperDetail = () => {
  return useQuery(["helperDetail"], () => getHelperDetail());
};

export const registerErrand = (requestBody: ErrandRegisterRequestBody) => {
  return POST(`/errands`, requestBody);
};

export const selectHelper = (requestBody: SelecteHelperRequestBody) => {
  return PATCH(`/errands/:id/helper`, requestBody);
};
