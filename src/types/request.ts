export type ErrandCreateRequestBody = {
  category: string;
  title: string;
  detail: string;
  reward: string;
  detailAddress: string;
  phoneNumber: string;
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
