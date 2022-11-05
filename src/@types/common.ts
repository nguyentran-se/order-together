export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export type Callback = (...args: any[]) => void;

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
