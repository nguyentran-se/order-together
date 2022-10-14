// import { ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit";

export const utils = {};
// enum Action {
//   REQUEST = "request",
//   SUCCEED = "succeed",
//   FAILED = "failed",
// }
// export function createAsyncAction<T>(type: string): {
//   [type: string]: ActionCreatorWithPayload<T>
// } {
//   const cordinatorAction = createAction<T>(type);
//   return {
//     [type]: cordinatorAction,
//     request: `${type}Request`,
//     succeed: `${type}Succeed`,
//     failed: `${type}Failed`,
//   };
// }


export const breakpoints = {
  sm: '(max-width:320px)',
  md: '(max-width:768px)',
  lg: '(max-width:960px)',
  xl: '(max-width:1200px)',
  '2xl': '(max-width:1536px)',
}
