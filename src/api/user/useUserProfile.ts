import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { User } from "@type/response";
import { CustomError, GET } from "@utils/axios";
import { useQuery } from "react-query";

const getUserProfile = async (id: number): Promise<User> => {
  const { data } = await GET(`/user/${id}`);
  return data;
};
export const useUserProfile = (id: number) => {
  const { push } = useNavigator();

  return useQuery([KEYS.USER_PROFILE], () => getUserProfile(id), {
    onError: (e: CustomError) => {
      push(`/error?status=${e.status}`);
    },
  });
};

export default useUserProfile;
