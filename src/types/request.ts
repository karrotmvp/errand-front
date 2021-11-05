export type SelecteHelperRequestBody = {
  helperId: number;
};

export type ApplyHelperRequestBody = {
  errandId: number;
  phoneNumber: string;
  appeal: string;
  isSetAlarm?: boolean;
  regionId: number;
};

export type CancelApplyRequestBody = {
  errandId: number;
};
