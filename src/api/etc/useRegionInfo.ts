import { KEYS } from "@constant/reactQuery";
import { Region } from "@type/response";
import { GET } from "@utils/axios";
import { getValueFromSearch } from "@utils/utils";
import { useQuery } from "react-query";

const getRegionInfo = async (): Promise<Region> => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(`/region?regionId=${regionId}`);
  return data;
};
export const useRegionInfo = () => {
  return useQuery([KEYS.REGION_INFO], () => getRegionInfo());
};

export default useRegionInfo;
