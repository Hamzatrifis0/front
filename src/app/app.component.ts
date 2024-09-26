import {
  Component,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartService } from "./products/data-access/cart.service";
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, BadgeModule],
})
export class AppComponent {
  title = "ALTEN SHOP";

  constructor(private cartService: CartService) {}

  // Ajoutez cette propriété pour obtenir la quantité totale
  get totalQuantity() {
    return this.cartService.getTotalQuantity();
}

}
