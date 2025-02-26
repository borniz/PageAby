import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  imagePreview: string | ArrayBuffer | null = null;
  selectFile: any | null = null;
  productForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.productForm = this.fb.group({
      name: [data.product.name, [Validators.required]],
      description: [data.product.description, [Validators.required]],
      category: [data.product.category],
      stock: [data.product.stock, [Validators.required]],
      base_price: [data.product.base_price, [Validators.required]]
    })
  };
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
  };
  save(): void {
    if (this.productForm.valid) {
      console.log("entramos en el if de save");

      this.productService.updateProduct(this.data.product.id, this.productForm.value).subscribe({
        next: (response) => {
          if (this.selectFile && response.id) {
            this.productService.uploadImage(this.selectFile, response.id).subscribe({
              next: () => {
                alert('Imagen Subida Correctamente');
                window.location.reload();
              },
              error: (error) => console.error('Error al Subir la Imagen', error)
            });
          }

          this.dialogRef.close(response);
        },
        error(err) {
          console.error("Error al Modificar el Producto", err)
          alert("Se Produjo un Error al Modificar el Producto")

        },

      })
    }
  }
}
