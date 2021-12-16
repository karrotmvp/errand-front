import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { AlarmResponseBody } from "@type/response";
import { CustomError, GET } from "@utils/axios";
import { useQuery } from "react-query";

const getUserAlarms = async (): Promise<AlarmResponseBody> => {
  const { data } = await GET(`/user/alarm`);
  return data;
};

const useUserAlarms = () => {
  const { push } = useNavigator();
  
  return useQuery([KEYS.USER_ALRAMS], () => getUserAlarms(), {
    onError: (e: CustomError) => {
      push(`/error?status=${e.status}`);
    },
  });
};

export default useUserAlarms;
