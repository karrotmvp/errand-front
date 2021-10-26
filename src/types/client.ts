export type TabType = "main" | "request" | "help";

export type ErrandStatus = "WAIT" | "PROCEED" | "COMPLETE" | "FAIL";

export type ErrandRequestParams = {
  lastId: number;
};
