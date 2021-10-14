import { useQuery } from "react-query";
import { GET, PATCH, POST } from "@utils/axios";
import { Errand, ErrandDetail, Resume, User } from "@type/response";
import { TabType } from "@type/client";
import {
  ErrandRegisterRequestBody,
  SelecteHelperRequestBody,
} from "@type/request";

const getErrandList = (filter?: TabType): Promise<Errand[]> => {
  return GET(`/errands${filter !== "main" ? `?filter=${filter}` : ""}`);
};
export const useErrandList = (filter?: TabType) => {
  return useQuery(["errandList", filter], () => getErrandList(filter));
};

const getErrandDetail = (): Promise<ErrandDetail> => {
  return GET(`/errands/:id`);
};
export const useErrandDetail = () => {
  return useQuery(["errandDetail"], () => getErrandDetail());
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
