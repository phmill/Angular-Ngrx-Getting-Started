import { Action } from "@ngrx/store";
import { Product } from "../product";

export enum ProductActionTypes {
  ToggleProductCode = "[Product] Toggle Product Code",
  SetCurrentProduct = "[Product] Set Current Product",
  ClearCurrentProduct = "[Product] Clear Current product",
  InitializeCurrentProduct = "[Product] Initialize Current Product",
  Load = "[Product] Load",
  LoadSuccess = "[Product] Load success",
  LoadFail = "[Product] cannot receive list of products from the server",
}

export class Load implements Action {
  readonly type = ProductActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ProductActionTypes.LoadSuccess;

  constructor(public payload: Product[]) {}
}

export class LoadFail implements Action {
  readonly type = ProductActionTypes.LoadFail;

  constructor(public payload: string) {}
}

export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitializeCurrentProduct;
}

export type ProductActions =
  | ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct
  | Load
  | LoadSuccess
  | LoadFail;
