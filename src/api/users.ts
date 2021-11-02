import { useQuery } from "react-query";
import { GET } from "@utils/axios";
import { User } from "@type/response";

const getUserProfile = async (id: number): Promise<User> => {
  const { data } = await GET(`/users/:${id}`);
  return data;
};
export const useUserProfile = (id: number) => {
  return useQuery(["userProfile"], () => getUserProfile(id));
};

const getMyInfo = async (): Promise<User> => {
  const { data } = await GET(`/users/my`);
  return data;
};
export const useMyInfo = () => {
  return useQuery(["myInfo"], () => getMyInfo());
};
