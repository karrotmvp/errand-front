import { useMutation, useQuery } from "react-query";
import { GET, PATCH } from "@utils/axios";
import { AlarmResponseBody, User } from "@type/response";
import { getValueFromSearch } from "@utils/utils";

const getUserProfile = async (id: number): Promise<User> => {
  const { data } = await GET(`/user/:${id}`);
  return data;
};
export const useUserProfile = (id: number) => {
  return useQuery(["userProfile"], () => getUserProfile(id));
};

const getMyInfo = async (): Promise<User> => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(`/user/my?regionId=${regionId}`);
  return data;
};
export const useMyInfo = () => {
  return useQuery(["myInfo"], () => getMyInfo());
};

const getUserAlarm = async (): Promise<AlarmResponseBody> => {
  const { data } = await GET(`/user/alarm`);
  return data;
};

export const useUserAlarm = () => {
  return useQuery(["userAlarm"], () => getUserAlarm());
};

export const patchCategoryAlarm = (body: {
  categoryId: number;
  on: boolean;
}) => {
  return PATCH("/user/category", body);
};

export const patchNewApplierAlarm = (body: { on: boolean }) => {
  return PATCH("/user/alarm", body);
};
