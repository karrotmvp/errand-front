import { useQuery } from "react-query";
import { GET, POST } from "@utils/axios";
import { Region } from "@type/response";

const getRegionInfo = async (regionId: string): Promise<Region> => {
  const { data } = await GET(`/region?regionId=${regionId}`);
  return data;
};
export const useRegionInfo = (regionId: string) => {
  return useQuery(["regionInfo"], () => getRegionInfo(regionId));
};

export const login = async (code: string, regionId: string) => {
  const { data } = await POST(`/auth?authCode=${code}&regionId=${regionId}`);

  if (data.status === "OK" && data.data.token) {
    localStorage.setItem("token", data.token);
  } else {
    console.log("응답은 됐는데 먼가 잘못 되었다");
  }
};
