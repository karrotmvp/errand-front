export type PushType = <T = object>(
  to: string,
  options?:
    | {
        present?: boolean | undefined;
      }
    | undefined
) => Promise<T | null>;
