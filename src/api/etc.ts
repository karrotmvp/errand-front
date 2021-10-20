import { useQuery } from "react-query";
import { GET } from "@utils/axios";

const getRegionInfo = (regionId: string) => {
  return GET(`/region?regionId=${regionId}`);
};
export const useRegionInfo = (regionId: string) => {
  return useQuery(["regionInfo"], () => getRegionInfo(regionId));
};

export const login = () => {};
