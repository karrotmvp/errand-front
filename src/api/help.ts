import { ApplyHelperRequestBody } from "@type/request";
import { POST } from "@utils/axios";

export const applyErrand = async (requestBody: ApplyHelperRequestBody) => {
  const { data } = await POST(`/help`, requestBody);
  return data;
};
