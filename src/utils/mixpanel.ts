import envs from "@config/dotenv";
import mixpanel from "mixpanel-browser";

mixpanel.init(envs.MIXPANEL_TOKEN);

// let env_check = process.env.NODE_ENV === "production";

interface Dict {
  [key: string]: any;
  page?: PageType;
  confirm?: ConfirmType;
  clickTarget?: string;
  detailId?: number;
}

const env_check = true;

let userId = "";

export type PageType =
  | "홈"
  | "심부름 상세"
  | "지원자 목록"
  | "지원내역"
  | "지원하기"
  | "알림설정"
  | "요청하기"
  | "마이"
  | "배너";

type ConfirmType =
  | "지원완료"
  | "지원취소"
  | "삭제하기"
  | "심부름 완료"
  | "요청하기"
  | "헬퍼지정";

const CustomMixPanel = {
  setUserId: (id: string) => {
    userId = id;
  },
  alias: (id: string) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name: string, props?: Dict) => {
    if (env_check) mixpanel.track(name, { ...props, userId });
  },
  people: {
    set: (props: Dict) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
  eventName: {
    firstLogin: "최초 로그인",
    login: "유저 로그인",
    refresh: "리스트 새로고침",
    clickBanner: "배너 클릭",
    clickBannerButton: "붕어빵 요청하기 클릭",
    clickBack: "뒤로가기 클릭",
    clickClose: "앱 닫기 클릭",
    clickInput: "Input 클릭",
    clickCTA: "CTA 클릭",
    clickNoConfirm: "confirm 모달 '아니오' 클릭",
    clickETC: "기타 클릭",
  },
};

export default CustomMixPanel;
