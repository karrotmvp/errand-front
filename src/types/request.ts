export type SelecteHelperRequestBody = {
  applierId: string;
};

export type ApplyHelperRequestBody = {
  errandId: string;
  phoneNumber: string;
  appeal: string;
  isSetAlarm?: boolean;
  regionId: number;
};

export type CancelApplyRequestBody = {
  errandId: string;
};
