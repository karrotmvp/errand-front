import { POST } from "@utils/axios";

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
