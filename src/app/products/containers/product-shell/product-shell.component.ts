import { Store, select } from "@ngrx/store";

import { Product } from "../../product";
import * as productActions from "../../state/product.actions";
import * as fromProduct from "../../state/product.reducer";
import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";

@Component({
  templateUrl: "./product-shell.component.html",
})
export class ProductShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<fromProduct.state>) {}

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());

    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(
      select(fromProduct.getCurrentProduct)
    );
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }

  checkChanged(value: boolean): void {
    console.log("radio button value is: " + value);

    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  saveProduct(product: Product) {
    this.store.dispatch(new productActions.CreateProduct(product));
  }

  updateProduct(product: Product) {
    this.store.dispatch(new productActions.UpdateProduct(product));
  }
  deleteProduct(product: Product) {
    this.store.dispatch(new productActions.DeleteProduct(product.id));
  }

  clearProduct() {
    this.store.dispatch(new productActions.ClearCurrentProduct());
  }
}
