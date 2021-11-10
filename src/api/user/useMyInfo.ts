import { KEYS } from "@constant/reactQuery";
import { User } from "@type/response";
import { GET } from "@utils/axios";
import { getValueFromSearch } from "@utils/utils";
import { useQuery } from "react-query";

const getMyInfo = async (): Promise<User> => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(`/user/my?regionId=${regionId}`);
  return data;
};
const useMyInfo = () => {
  return useQuery([KEYS.MY_INFO], () => getMyInfo());
};

export default useMyInfo;
