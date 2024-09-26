import { Component, OnInit, inject } from "@angular/core";
import { CartService } from "app/products/data-access/cart.service";
import { Product } from "app/products/data-access/product.model";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { CardModule } from "primeng/card";
import { MessageService } from "primeng/api";
import { ToastModule } from 'primeng/toast';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag'; 
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  standalone: true,
  imports: [CommonModule, ButtonModule,CardModule, ToastModule, DataViewModule, TagModule, InputNumberModule, FormsModule],
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  public cartItems: Product[] = [];

  constructor(private messageService: MessageService) {}
  
  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  
  public onRemoveFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems(); 
    this.showMessage("Le produit est bien supprimé","warning","Produit supprimé");
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

  increaseQuantity(item: any) {
    item.quantity += 1; // Increase the quantity
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1; // Decrease the quantity if greater than 1
    }
  }
}
