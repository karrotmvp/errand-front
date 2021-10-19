export type ErrandRegisterRequestBody = {
  categoryId: number;
  title: string;
  detail: string;
  reward: number;
  phoneNumber: string;
  detailAddress?: string;
  regionId: string;
};

export type SelecteHelperRequestBody = {
  helperId: number;
};

export type ApplyHelperRequestBody = {
  phoneNumber: string;
  appeal: string;
  isSetAlarm: boolean;
  regionId: number;
};
