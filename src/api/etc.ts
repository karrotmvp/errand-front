import { useQuery } from "react-query";
import { GET, POST } from "@utils/axios";
import { Region } from "@type/response";

const getRegionInfo = (regionId: string): Promise<Region> => {
  return GET(`/region?regionId=${regionId}`);
};
export const useRegionInfo = (regionId: string) => {
  return useQuery(["regionInfo"], () => getRegionInfo(regionId));
};

export const login = async (code: string, regionId: string) => {
  const { status, data } = await POST(`auth`, { code, regionId });

  if (status === "OK" && data.token) {
    localStorage.setItem("token", data.token);
  } else {
    console.log("응답은 됐는데 먼가 잘못 되었다");
    console.log(status);
    console.log(data);
  }
};
