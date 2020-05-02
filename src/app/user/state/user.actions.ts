import { Action } from "@ngrx/store";

export enum UserActionTypes {
  MaskUserName = "[User] Mask or UnMask UserName",
}

export class MaskUserName implements Action {
  readonly type = UserActionTypes.MaskUserName;

  constructor(public payload: boolean) {}
}

export type UserActions = MaskUserName;
