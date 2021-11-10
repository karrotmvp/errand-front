import { KEYS } from "@constant/reactQuery";
import { User } from "@type/response";
import { GET } from "@utils/axios";
import { useQuery } from "react-query";

const getUserProfile = async (id: number): Promise<User> => {
  const { data } = await GET(`/user/${id}`);
  return data;
};
export const useUserProfile = (id: number) => {
  return useQuery([KEYS.USER_PROFILE], () => getUserProfile(id));
};

export default useUserProfile;
