export type SelecteHelperRequestBody = {
  applierId: string;
};

export type ApplyHelperRequestBody = {
  errandId: string;
  phoneNumber: string;
  appeal: string;
  regionId: string;
};

export type CancelApplyRequestBody = {
  errandId: string;
};
