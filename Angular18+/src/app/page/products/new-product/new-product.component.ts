import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../../service/product.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],

  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
  isLoading = false;
  imagePreview: string | ArrayBuffer | null = null;
  selectFile: any | null = null;

  products: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.products = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      base_price: ['', [Validators.required]],
    });
  }
  value = '';

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectFile);
    }
  }

  save() {
    if (!this.products.valid) {
      alert('Faltan algunos Campos');
    }
    this.isLoading = true;
    this.productService.createProduct(this.products.value).subscribe({
      next: (response) => {
        if (this.selectFile && response.id) {
          this.productService
            .uploadImage(this.selectFile, response.id)
            .subscribe({
              next: () => {
                alert('Producto Guardado Correctament');
                alert('Imagen Subida Correctamente'), window.location.reload();
              },
              error: (error) => {
                
                console.error('Error al Subir la Imagen', error);
                this.isLoading = false;
              }
            });
        }
      },
      error: (error) => {
        console.error('Error al Guardar el Producto', error);
        alert('Hubo un Error al Guardar Producto');
        this.isLoading = false;
      },
    });
    
  }
}
