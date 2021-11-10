import { KEYS } from "@constant/reactQuery";
import { AlarmResponseBody } from "@type/response";
import { GET } from "@utils/axios";
import { useQuery } from "react-query";

const getUserAlarms = async (): Promise<AlarmResponseBody> => {
  const { data } = await GET(`/user/alarm`);
  return data;
};

const useUserAlarms = () => {
  return useQuery([KEYS.USER_ALRAMS], () => getUserAlarms());
};

export default useUserAlarms;
