import { Injectable } from "@angular/core";
import { Product } from "./product.model";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private cartItems: Product[] = [];

    // Ajouter un produit au panier
    addToCart(product: Product) {
        const existingProduct = this.cartItems.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1; 
        } else {
            this.cartItems.push({ ...product, quantity: 1 });
        }
    }

    // Supprimer un produit de panier
    removeFromCart(productId: number) {
        this.cartItems = this.cartItems.filter(item => item.id !== productId);
    }

    // Retourne la liste des produits du panier
    getCartItems(): Product[] {
        return this.cartItems; 
    }

    // Calcule la quantité totale
    getTotalQuantity(): number {
        return this.cartItems.reduce((total, item) => total + item.quantity, 0); 
    }
}
