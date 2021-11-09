import { useQuery } from "react-query";
import { GET, POST } from "@utils/axios";
import { Region } from "@type/response";
import { getValueFromSearch } from "@utils/utils";

const getRegionInfo = async (): Promise<Region> => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(`/region?regionId=${regionId}`);
  return data;
};
export const useRegionInfo = () => {
  return useQuery(["regionInfo"], () => getRegionInfo());
};

export const reqeustLogin = async (code: string, regionId: string) => {
  const { data, status } = await POST(
    `/auth?authCode=${code}&regionId=${regionId}`
  );
  if (status === "OK" && data.token) {
    localStorage.removeItem("token");
    localStorage.setItem("token", data.token);
    return status;
  } else {
    new Error("응답은 됐는데 먼가 잘못 되었다");
  }
};
