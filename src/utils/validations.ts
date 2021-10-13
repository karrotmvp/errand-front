const EMAIL_REGEX = /^\S+@\S+\.(\S{2,})+/;

//비밀번호는 대문자,소문자,숫자, 문자 문자 중 2종류이상의 조합으로 10자 이상으로 이루어져있어야 합니다
const PW_REGEX_RULE =
  /^(?=.*[A-Za-z])(?=.*[0-9])([^\s]){10,}|(?=.*[A-Za-z])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}|(?=.*[0-9])(?=.*[<>{}|;:.,~!?@#$%^=&*\”\\/])([^\s]){10,}$/;

const PW_MIN_LEN = 10;

const PHONE_NUMBER_REGEX = /^010-?([0-9]{4})-?([0-9]{4})$/;

export const VALIDATION_ERR_MSG = {
  DUPLICATE_EMAIL: "이미 존재하는 이메일입니다",
  INVALID_EMAIL: "올바른 이메일 형식이 아닙니다",
  INVALID_PW: "올바른 비밀번호 형식이 아닙니다",
  INVALID_CONFIRM: "비밀번호가 서로 다릅니다",
  INVALID_NAME: "이름을 작성해 주세요",
  INVALID_ADDRESS_NAME: "배송지명을 작성해 주세요",
  INVALID_PHONE: "올바른 양식이 아닙니다",
  INVALID_REVIEW: "리뷰를 작성해주세요.",
  INVALID_QUESTION: "문의를 작성해주세요.",
};

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePW = (pw: string): boolean => {
  return pw.length >= PW_MIN_LEN && PW_REGEX_RULE.test(pw);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  return PHONE_NUMBER_REGEX.test(phoneNumber);
};

export const validateTextarea = (review: string): boolean => {
  return review.length > 0;
};

export const validateReviewRate = (rate: string): boolean => {
  return rate !== "0";
};
