import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { User } from "@type/response";
import { CustomError, GET } from "@utils/axios";
import { getValueFromSearch } from "@utils/utils";
import { useQuery } from "react-query";

const getMyInfo = async (): Promise<User> => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(`/user/my?regionId=${regionId}`);
  return data;
};
const useMyInfo = () => {
  const { push } = useNavigator();

  return useQuery([KEYS.MY_INFO], () => getMyInfo(), {
    onError: (e: CustomError) => {
      push(`/error?status=${e.status}`);
    },
  });
};

export default useMyInfo;
