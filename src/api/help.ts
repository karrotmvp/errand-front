import { ApplyHelperRequestBody, CancelApplyRequestBody } from "@type/request";
import { DELETE, POST } from "@utils/axios";

export const applyErrand = async (requestBody: ApplyHelperRequestBody) => {
  const { data } = await POST(`/help`, requestBody);
  return data;
};

export const cancelApply = async (requestBody: CancelApplyRequestBody) => {
  const { data } = await DELETE(`/help}`);
  return data;
};
