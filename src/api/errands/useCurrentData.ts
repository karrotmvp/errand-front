import { KEYS } from "@constant/reactQuery";
import { useNavigator } from "@karrotframe/navigator";
import { CurrentData } from "@type/response";
import { CustomError, GET } from "@utils/axios";
import { useQuery } from "react-query";

const getCurrentData = async (): Promise<CurrentData> => {
  const { data } = await GET(`/errands/current-data`);
  return data;
};

const useCurrentData = () => {
  const { push } = useNavigator();

  return useQuery([KEYS.CURRENT_DATA], () => getCurrentData(), {
    onError: (e: CustomError) => {
      push(`/error?status=${e.status}`);
    },
  });
};

export default useCurrentData;
