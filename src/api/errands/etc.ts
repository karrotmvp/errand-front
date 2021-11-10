import { GET } from "@utils/axios";

export const confirmIsAppliable = async (
  errandId: string
): Promise<{ helperCount: number; canApply: boolean }> => {
  const { data } = await GET(`/errand/${errandId}/helper-count`);
  return data;
};
