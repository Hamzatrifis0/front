import { Component, OnInit, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common"
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { CartService } from "app/products/data-access/cart.service";
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";





const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, CommonModule,RatingModule,FormsModule,TagModule, ToastModule],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService); 

  public readonly products = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  constructor(private messageService: MessageService) {}
  
  ngOnInit() {
    this.productsService.get().subscribe();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
    this.showMessage("Le produit est bien supprimé","warning",product.name);
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }


  // Améliorer les performances lors du rendu des listes
  public trackProduct(index: number, product: Product) {
    return product.id; // ou utilisez un champ unique si 'id' n'est pas unique
  }

  // Permettre d'ajouter un produit au panier depuis la liste 
  public onAddToCart(product: Product) {
    this.cartService.addToCart(product);
    this.showMessage("Le produit est bien ajouté au panier","Info","Produit ajouté !");
  }

  // Récupère la quantité totale d'articles dans le panier
  public get totalQuantity() {
    return this.cartService.getTotalQuantity(); 
  }

  // Afficher un message
  showMessage(message: string, severity: string, summary: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: message,
      life: 3000 
    });
  }

  increaseQuantity(product: Product) {
    product.quantity += 1; // Increase the quantity
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity -= 1; // Decrease the quantity if greater than 1
    }
  }
}
