import { PATCH } from "@utils/axios";

export const patchCategoryAlarm = (body: {
  categoryId: number;
  on: boolean;
}) => {
  return PATCH("/user/category", body);
};

export const patchNewApplierAlarm = (body: { on: boolean }) => {
  return PATCH("/user/alarm", body);
};
