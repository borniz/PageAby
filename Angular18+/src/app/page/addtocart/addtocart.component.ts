import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-addtocart',
  standalone: true,
  imports: [NgClass, FormsModule, NgIf],
  templateUrl: './addtocart.component.html',
  styleUrl: './addtocart.component.css',
})
export class QuantityModalComponent {
  @Input() isVisible: boolean = false;
  @Input() product: any; // Puedes definir mejor el tipo
  @Output() close = new EventEmitter<void>();
  @Output() addToCart = new EventEmitter<number>();
  quantity: number = 1; // Cantidad por defecto

  onClose() {
    this.close.emit();
  }

  onAddToCart() {
    this.addToCart.emit(this.quantity);
    this.onClose(); // Cerrar el modal después de agregar
  }
}
