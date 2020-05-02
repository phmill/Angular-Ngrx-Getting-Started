import { Component, OnInit, OnDestroy } from "@angular/core";

import { Store, select } from "@ngrx/store";

import { Product } from "../product";
import { ProductService } from "../product.service";
import * as productActions from "../state/product.actions";
import * as fromProduct from "../state/product.reducer";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Products";
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(
    private store: Store<fromProduct.state>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // TODO: unsubscribe
    this.store
      .pipe(select(fromProduct.getCurrentProduct))
      .subscribe((currentProduct) => (this.selectedProduct = currentProduct));

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
      error: (err: any) => (this.errorMessage = err.error),
    });

    // TODO : unsubscribe
    this.store
      .pipe(select(fromProduct.getShowProductCode))
      .subscribe((showProductCode) => {
        this.displayCode = showProductCode;
      });
  }

  ngOnDestroy(): void {}

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
}
