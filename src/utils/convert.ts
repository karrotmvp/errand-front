export const insertChar = (str: string, index: number, char: string) => {
  return str.substring(0, index) + char + str.substring(index, str.length);
};

export const convertToNumber = (str: string): string => {
  const regex = new RegExp("[^0-9]", "g");
  const maxLength = 11;

  return str.replace(regex, "").substring(0, maxLength);
};

export const convertToKRW = (reward: number) => {
  return (Number(reward).toLocaleString() ?? 0) + "원";
};

export const convertToPhoneNumber = (origin?: string): string => {
  if (!origin) return "";

  //010-23O8-1O24
  const numbers = convertToNumber(origin);

  //01023081024
  let form = numbers;

  //010-2
  if (numbers.length > 3) {
    form = insertChar(form, 3, "-");
  }
  //010-2308-1
  if (numbers.length > 7) {
    form = insertChar(form, 8, "-");
  }
  return form;
};
