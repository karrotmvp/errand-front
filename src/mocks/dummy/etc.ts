import { DEFAULT_THUMBNAIL } from "@constant/default";
import { Resume, User } from "@type/response";

export const user: User = {
  id: 1,
  nickname: "테스트맨",
  regionName: "논현동",
  mannerTemp: 37.5,
  profileImgUrl:
    "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
};

export const applyList: User[] = [
  {
    id: 1,
    nickname: "DD",
    regionName: "반포1동",
    mannerTemp: 39.5,
    profileImgUrl:
      "https://user-images.githubusercontent.com/41738385/137061472-e444943d-64dd-4ec9-8aa6-601e86706aa2.jpg",
  },
  {
    id: 2,
    nickname: "Rosie",
    regionName: "혜화동",
    mannerTemp: 100,
  },
  {
    id: 3,
    nickname: "Christine",
    regionName: "연남동",
    mannerTemp: 40,
  },
  {
    id: 4,
    nickname: "Noah",
    regionName: "청담동",
    mannerTemp: 52.5,
  },
];

export const resume: Resume = {
  isMatched: false,
  appeal:
    "저 강아지를 진짜 좋아해요 ㅎㅎ 지금 집에서 한마리 키우고 있는데 같이 산책하면 좋을 것 같아요 ㅎㅎ 상세페이지에서는 이 네모가 그냥 없어질게요 만약에 글줄이 길어지면 뒤에 배경 있는게 너무 답답하고 부담스럽더라구욤. 만약에 500자가 적어지면 어떻게 보이는지 최대 글자로 써보면 이렇게 보일 것 같아여ㅕ~~ 글자수는 공백을 포함하여 최대 500자까지 작성이 가능하고 일단 한 글자라도 적으면 유효성검사는 통과하는 걸로 하는건 어떨까요? 깔깔 500자까지 적을 사람이 있으려는지 모르겠지만 이렇게 많이 써야 500자가 넘는다고요! 힘드네여.. 아 맞다 저희집 갱얼쥐는요 점심시간만 되면 똥꼬깨발랄이 되서 꼭 산책을 하고싶어해요. 근데 저는 일을 가야되서 대신 누가 산책해주시면 정말 좋을 것 같아요. 주말에 한번 뵙고 강아지랑 친해지신 다음에 평일에 제가 부재중일 때 시간 맞춰서 저희 집 갱얼쥐 미니를 산책시켜주시면 정말 감사할 것 같습니다. 다른 강아지랑 보통 친하게 지내는 편이고 산책할 ",
  helper: {
    id: 3,
    nickname: "Christine",
    regionName: "연남동",
    mannerTemp: 40,
    profileImgUrl: DEFAULT_THUMBNAIL,
  },
};

export const region = {
  name: "역삼1동",
  name1: "서울특별시",
  name2: "강남구",
  name3: "역삼1동",
};
