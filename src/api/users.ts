import { useQuery } from "react-query";
import { GET } from "@utils/axios";
import { User } from "@type/response";

const getUserProfile = (id: number): Promise<User> => {
  return GET(`/users/:${id}`);
};
export const useUserProfile = (id: number) => {
  return useQuery(["userProfile"], () => getUserProfile(id));
};

const getMyInfo = (): Promise<User> => {
  return GET(`/users/my`);
};
export const useMyInfo = () => {
  return useQuery(["myInfo"], () => getMyInfo());
};
