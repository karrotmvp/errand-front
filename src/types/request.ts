export type ErrandRegisterRequestBody = {
  imageUrls: string[];
  categoryId: number;
  title: string;
  detail: string;
  reward: number;
  detailAddress?: string;
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
