import {
  ErrandDetailResponseBody,
  ErrandPreviewResponseBody,
} from "@type/response";

export type modalInfoFlagType =
  | "isMyErrand"
  | "isApplier"
  | "resume"
  | "isHelper"
  | "noModal";

type ButtonCallback =
  | "moveToResume"
  | "moveToAppliers"
  | "moveToApplyForm"
  | "openConfirmModal"
  | "none";

type RefinedData = {
  color: string;
  statusText: string;
  buttonText: string;
  buttonDisabled: boolean;
  modalInfoFlag?: modalInfoFlagType;
  buttonCallback?: ButtonCallback;
};

const DEFAULT_REFINED_DATA = {
  color: "",
  statusText: "있을 수 없는 경우!",
  buttonText: "있을 수 없는 경우!",
  buttonDisabled: true,
};

export const getRefinedFromData = (
  data: ErrandDetailResponseBody | ErrandPreviewResponseBody | undefined
): RefinedData => {
  if (!data) {
    return DEFAULT_REFINED_DATA;
  }

  const detailStatus = specifyStatus(data);
  if (detailStatus === "isMyErrand") {
    switch (data.errand.status) {
      case "WAIT":
        return {
          color: "",
          statusText: `지원 ${data.errand.helpCount}`,
          buttonText:
            data.errand.helpCount > 0
              ? `지원자 선택하기 ${data.errand.helpCount}`
              : "아직 지원자가 없어요",
          buttonDisabled: data.errand.helpCount > 0 ? false : true,
          modalInfoFlag: "isMyErrand",
          buttonCallback: data.errand.helpCount ? "moveToAppliers" : "none",
        };
      case "PROCEED":
        return {
          color: "",
          statusText: "심부름 진행중",
          buttonText: "지원자 정보 보기",
          buttonDisabled: false,
          modalInfoFlag: "isMyErrand",
          buttonCallback: "moveToResume",
        };
      case "COMPLETE":
        return {
          color: "GREY",
          statusText: "심부름 완료",
          buttonText: "심부름이 완료되었어요",
          buttonDisabled: true,
          modalInfoFlag: "isMyErrand",
        };
      case "FAIL":
        return DEFAULT_REFINED_DATA;
      default:
        return DEFAULT_REFINED_DATA;
    }
  }
  if (detailStatus === "isUnRelated") {
    switch (data.errand.status) {
      case "WAIT":
        return {
          color: data.errand.helpCount === 5 ? "GREY" : "",
          statusText:
            data.errand.helpCount >= 5
              ? "지원마감"
              : `지원 ${data.errand.helpCount}`,
          buttonText:
            data.errand.helpCount >= 5 ? "지원이 마감되었어요" : "지원하기",
          buttonDisabled: data.errand.helpCount >= 5,
          buttonCallback:
            data.errand.helpCount >= 5 ? "none" : "moveToApplyForm",
        };
      case "PROCEED":
        return {
          color: "GREY",
          statusText: "심부름 진행중",
          buttonText: "심부름이 진행중이에요",
          buttonDisabled: true,
        };
      case "COMPLETE":
        return {
          color: "GREY",
          statusText: "심부름 완료",
          buttonText: "심부름이 완료되었어요",
          buttonDisabled: true,
        };
      case "FAIL":
        return DEFAULT_REFINED_DATA;
      default:
        return DEFAULT_REFINED_DATA;
    }
  }
  if (detailStatus === "isApplier") {
    switch (data.errand.status) {
      case "WAIT":
        return {
          color: "GREY",
          statusText: "지원완료",
          buttonText: "지원이 완료되었어요",
          buttonDisabled: true,
          modalInfoFlag: "isApplier",
        };
      case "PROCEED":
        return DEFAULT_REFINED_DATA;
      case "COMPLETE":
        return {
          color: "GREY",
          statusText: "심부름 완료",
          buttonText: "심부름이 완료되었어요",
          buttonDisabled: true,
          modalInfoFlag: "resume",
        };
      case "FAIL":
        return {
          color: "GREY",
          statusText: "매칭실패",
          buttonText: "매칭되지 않았어요",
          buttonDisabled: true,
          modalInfoFlag: "resume",
        };
      default:
        return DEFAULT_REFINED_DATA;
    }
  }
  if (detailStatus === "isHelper") {
    switch (data.errand.status) {
      case "WAIT":
        return DEFAULT_REFINED_DATA;
      case "PROCEED":
        return {
          color: "",
          statusText: "심부름 진행중",
          buttonText: "심부름을 완료했어요",
          buttonDisabled: false,
          modalInfoFlag: "isHelper",
          buttonCallback: "openConfirmModal",
        };
      case "COMPLETE":
        return {
          color: "GREY",
          statusText: "심부름 완료",
          buttonText: "심부름을 완료했어요",
          buttonDisabled: true,
          modalInfoFlag: "resume",
        };
      case "FAIL":
        return DEFAULT_REFINED_DATA;
      default:
        return DEFAULT_REFINED_DATA;
    }
  }
  return DEFAULT_REFINED_DATA;
};

export type DetailStatusType =
  | "isMyErrand"
  | "isUnRelated"
  | "isApplier"
  | "isHelper"
  | "loading";

export const specifyStatus = ({
  isMine,
  didIApply,
  wasIChosen,
}: ErrandDetailResponseBody | ErrandPreviewResponseBody): DetailStatusType => {
  if (isMine && !didIApply && !wasIChosen) {
    return "isMyErrand";
  }
  if (!isMine && !didIApply && !wasIChosen) {
    return "isUnRelated";
  }
  if (!isMine && didIApply && !wasIChosen) {
    return "isApplier";
  }
  if (!isMine && didIApply && wasIChosen) {
    return "isHelper";
  }

  return "loading";
};
