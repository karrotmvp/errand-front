import { ApplyHelperRequestBody } from "@type/request";
import { Resume } from "@type/response";
import { DELETE, GET, POST } from "@utils/axios";
import { useQuery } from "react-query";

const getHelperDetail = async (helpId: string): Promise<Resume> => {
  const { data } = await GET(`/help/${helpId}`);
  return data;
};
export const useHelperDetail = (helpId: string) => {
  return useQuery(["helperDetail", helpId], () => getHelperDetail(helpId));
};

export const applyErrand = async (requestBody: ApplyHelperRequestBody) => {
  const { data } = await POST(`/help`, requestBody);
  return data;
};

export const cancelApply = async (helpId: string) => {
  const { status } = await DELETE(`/help/${helpId}`);
  return status;
};
