import { OverflowType } from "@pages/Home";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const useIntersection = () => {
  const [overflow, setOverflow] = useState<OverflowType>("hidden");
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    inView ? setOverflow("scroll") : setOverflow("hidden");
  }, [inView]);

  return {
    fetchTriggerElement: <div ref={ref} style={{ height: "2rem" }}></div>,
    overflow,
  };
};
