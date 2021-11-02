import { useQuery } from "react-query";
import { GET, POST } from "@utils/axios";
import { Region } from "@type/response";

const getRegionInfo = (regionId: string): Promise<Region> => {
  return GET(`/region?regionId=${regionId}`);
};
export const useRegionInfo = (regionId: string) => {
  return useQuery(["regionInfo"], () => getRegionInfo(regionId));
};

export const login = (code: string, regionId: string) => {
  return POST(`auth`, { code, regionId });
};
