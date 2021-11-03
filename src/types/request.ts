export type SelecteHelperRequestBody = {
  helperId: number;
};

export type ApplyHelperRequestBody = {
  phoneNumber: string;
  appeal: string;
  isSetAlarm: boolean;
  regionId: number;
};
