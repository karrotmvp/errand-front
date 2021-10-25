import { useNavigator } from "@karrotframe/navigator";

const usePush = (path: string) => {
  const { push } = useNavigator();

  return () => {
    push(path);
  };
};

export default usePush;
