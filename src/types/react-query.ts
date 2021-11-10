export type MutationCallbacks = {
  onSuccess?: (...rest: any[]) => void;
  onError?: (...rest: any[]) => void;
};
