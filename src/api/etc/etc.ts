import { GET, POST } from "@utils/axios";
import { getValueFromSearch } from "@utils/utils";

export const reqeustLogin = async (code: string, regionId: string) => {
  const { data, status } = await POST(
    `/auth?authCode=${code}&regionId=${regionId}`
  );
  if (status === "OK" && data.token) {
    localStorage.removeItem("token");
    localStorage.setItem("token", data.token);

    const region = await requestRegion();

    localStorage.removeItem("region");
    localStorage.setItem("region", region.name);

    return status;
  } else {
    new Error("로그인 실패");
  }
};

export const requestRegion = async () => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(`/region?regionId=${regionId}`);

  return data;
};
