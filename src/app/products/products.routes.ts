import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { ProductListComponent } from "./features/product-list/product-list.component";
import { CartComponent } from "./features/cart/cart.component";
import { ContactComponent } from "./features/contact/contact.component";

export const PRODUCTS_ROUTES: Routes = [
	{
		path: "list",
		component: ProductListComponent,
	},
	{ path: "cart", component: CartComponent },
	{ path: 'contact', component: ContactComponent }, 
	{ path: "**", redirectTo: "list" },
];
