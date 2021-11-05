import { GET } from "@utils/axios";
import { ErrandPreviewResponseBody } from "@type/response";
import { ERREND_REQUEST_SIZE } from "@constant/request";
import { getValueFromSearch } from "@utils/utils";

export const getMyErrandPreviews = async ({
  pageParam = null,
}): Promise<ErrandPreviewResponseBody[]> => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(
    `my/errands?size=${ERREND_REQUEST_SIZE}&regionId=${regionId}` +
      (pageParam ? `&lastId=${pageParam}` : "")
  );
  return data;
};

export const getMyHelpPreviews = async ({
  pageParam = null,
}): Promise<ErrandPreviewResponseBody[]> => {
  const regionId = getValueFromSearch("region_id");
  const { data } = await GET(
    `my/helps?size=${ERREND_REQUEST_SIZE}&regionId=${regionId}` +
      (pageParam ? `&lastId=${pageParam}` : "")
  );
  return data;
};
