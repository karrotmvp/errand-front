import { KEYS } from "@constant/reactQuery";
import { CurrentData } from "@type/response";
import { GET } from "@utils/axios";
import { useQuery } from "react-query";

const getCurrentData = async (): Promise<CurrentData> => {
  const { data } = await GET(`/errands/current-data`);
  return data;
};

const useCurrentData = () => {
  return useQuery([KEYS.CURRENT_DATA], () => getCurrentData());
};

export default useCurrentData;
