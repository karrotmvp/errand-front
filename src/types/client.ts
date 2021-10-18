export type TabType = "main" | "request" | "help";

export type ErrandStatus = "wait" | "proceed" | "complete" | "fail";

export type ErrandRequestParams = {
  lastId: number;
  size: number;
  filter?: TabType;
};
