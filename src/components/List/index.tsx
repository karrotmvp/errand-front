import { TabType } from "@type/client";
import Item from "./Item";
import NoData from "@components/Nodata";
import { ERREND_REQUEST_SIZE } from "@constant/request";
import { Container } from "@styles/shared";
import { InfiniteData } from "react-query";
import { ErrandPreviewResponseBody } from "@type/response";

type ListProps = {
  tabType: TabType;
  list?: InfiniteData<ErrandPreviewResponseBody[]>;
  fetchTriggerElement: React.ReactNode;
  isDoneFetch: boolean;
};

export default function List({
  tabType,
  list,
  fetchTriggerElement,
  isDoneFetch,
}: ListProps) {
  if (!list) {
    return null;
  }

  return (
    <Container>
      <ul style={{ minHeight: "100%" }}>
        {list?.pages[0].length === 0 ? (
          <NoData tabType={tabType} />
        ) : (
          list?.pages?.map((group) =>
            group?.map((item, index, array) => (
              <>
                {index === array.length - ERREND_REQUEST_SIZE / 2 &&
                  isDoneFetch &&
                  fetchTriggerElement}
                <Item {...{ item, tabType }} key={item?.errand.id} />
              </>
            ))
          )
        )}
      </ul>
      <div style={{ height: "2rem" }}></div>
    </Container>
  );
}
