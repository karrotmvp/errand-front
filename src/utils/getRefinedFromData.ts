import { ErrandDetailResponseBody } from "@type/response";

type RefinedData = {
  color: string;
  detailStatus: string;
  buttonText: string;
  buttonDisabled: boolean;
  handleButtonClick?: () => void;
};

const DEFAULT_REFINED_DATA = {
  color: "",
  detailStatus: "",
  buttonText: "",
  buttonDisabled: true,
};

export const getRefinedFromData = (
  data: ErrandDetailResponseBody | undefined
): RefinedData => {
  if (!data) {
    return DEFAULT_REFINED_DATA;
  }

  const detailStatus = specifyStatus(data);

  if (detailStatus === "isMyErrand") {
    switch (data.errand.status) {
      case "WAIT":
        return {
          color: data.errand.helpCount > 0 ? "PRIMARY" : "GREY",
          detailStatus: `지원 ${data.errand.helpCount}`,
          buttonText:
            data.errand.helpCount > 0
              ? `지원자 선택하기 ${data.errand.helpCount}`
              : "아직 지원자가 없어요",
          buttonDisabled: data.errand.helpCount > 0 ? false : true,
          handleButtonClick: data.errand.helpCount > 0 ? () => {} : () => {},
        };
      case "PROCEED":
        return {
          color: "PRIMARY",
          detailStatus: "진행중",
          buttonText: "지원자 정보 보기",
          buttonDisabled: false,
          handleButtonClick: () => {},
        };
      case "COMPLETE":
        return {
          color: "GREY",
          detailStatus: "완료",
          buttonText: "심부름이 완료되었어요",
          buttonDisabled: true,
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
          color:
            data.errand.helpCount === 0 || data.errand.helpCount === 5
              ? "GREY"
              : "",
          detailStatus:
            data.errand.helpCount < 5
              ? `지원 ${data.errand.helpCount}`
              : "지원마감",
          buttonText:
            data.errand.helpCount < 5 ? "지원하기" : "지원이 마감되었어요",
          buttonDisabled: data.errand.helpCount >= 5,
          handleButtonClick: () => {},
        };
      case "PROCEED":
        return {
          color: "GREY",
          detailStatus: "진행중",
          buttonText: "심부름이 진행중이에요",
          buttonDisabled: true,
        };
      case "COMPLETE":
        return {
          color: "GREY",
          detailStatus: "완료",
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
          detailStatus: "지원완료",
          buttonText: "지원이 완료되었어요",
          buttonDisabled: true,
        };
      case "PROCEED":
        return DEFAULT_REFINED_DATA;
      case "COMPLETE":
        return {
          color: "GREY",
          detailStatus: "완료",
          buttonText: "심부름이 완료되었어요",
          buttonDisabled: true,
        };
      case "FAIL":
        return {
          color: "GREY",
          detailStatus: "매칭실패",
          buttonText: "매칭되지 않았어요",
          buttonDisabled: true,
          handleButtonClick: () => {},
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
          color: "PRIMARY",
          detailStatus: "진행중",
          buttonText: "심부름을 완료했어요",
          buttonDisabled: false,
          handleButtonClick: () => {},
        };
      case "COMPLETE":
        return {
          color: "GREY",
          detailStatus: "완료",
          buttonText: "심부름을 완료했어요",
          buttonDisabled: true,
        };
      case "FAIL":
        return DEFAULT_REFINED_DATA;
      default:
        return DEFAULT_REFINED_DATA;
    }
  }
  return DEFAULT_REFINED_DATA;
};

type DetailStatusType =
  | "isMyErrand"
  | "isUnRelated"
  | "isApplier"
  | "isHelper"
  | "loading";

const specifyStatus = ({
  isMine,
  didIApply,
  wasIChosen,
}: ErrandDetailResponseBody): DetailStatusType => {
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
