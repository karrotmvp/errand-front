import dayjs from "dayjs";

export const uploadImage = async (file: File): Promise<string> => {
  return new Promise(async (resolve) => {
    const preSignedUrl = await getPreSignedUrl(
      file.name.split(".")[0] + dayjs(new Date()).format("YYYY-MM-DDTHH:mm:ss")
    );
    const imageUrl = await uploadToBucket(preSignedUrl, file);
    resolve(imageUrl as string);
  });
};

const getPreSignedUrl = (fileName: string) => {
  return fetch(
    "https://ocuf0br1z2.execute-api.ap-northeast-2.amazonaws.com/errand/presigned-url",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName: `${fileName}` }),
    }
  )
    .then((res) => res.json())
    .then((res) => res.url)
    .catch((e) => console.log(e));
};

const uploadToBucket = (preSignedUrl: string, file: File) => {
  return fetch(preSignedUrl, {
    method: "PUT",
    body: file,
    headers: new Headers({
      "Content-Type": "image/*",
    }),
  })
    .then((res) => res.url.split("?")[0])
    .catch((e) => console.log(e));
};
