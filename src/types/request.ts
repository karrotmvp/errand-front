export type ErrandRegisterRequestBody = {
  title: string;
  categoryId: number;
  detail: string;
  reward: string;
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
