import { ApplyHelperRequestBody } from "@type/request";
import { DELETE, POST } from "@utils/axios";

export const applyErrand = async (requestBody: ApplyHelperRequestBody) => {
  const { data } = await POST(`/help`, requestBody);
  return data;
};

export const cancelApply = async (helpId: string) => {
  const { status } = await DELETE(`/help/${helpId}`);
  return status;
};
