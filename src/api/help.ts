import { ApplyHelperRequestBody } from "@type/request";
import { GET, PATCH, POST } from "@utils/axios";

export const applyErrand = (requestBody: ApplyHelperRequestBody) => {
  return POST(`/help`, requestBody);
};
