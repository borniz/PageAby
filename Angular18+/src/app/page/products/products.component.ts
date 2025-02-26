import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../model/product';
import { CartService } from '../../service/cart.service';
import { ProductService } from '../../service/product.service';
import { QuantityModalComponent } from '../addtocart/addtocart.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { log } from 'console';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CurrencyPipe,
    QuantityModalComponent,
    RouterLink,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productList: any[] = [];
  products: IProduct[] = [];
  page = 1;
  limit = 10;
  loading = false;
  allProductsLoaded = false;
  @Output() shopping = new EventEmitter<boolean>();
  selectedProduct: IProduct | null = null;
  showModal: boolean = false;
  private _apiService = inject(ProductService);

  constructor(
    private cartservice: CartService,
    private dialog: MatDialog,
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts() {
    if (this.loading || this.allProductsLoaded) {
      console.log(
        '⛔ Carga detenida: loading =',
        this.loading,
        ' | allProductsLoaded =',
        this.allProductsLoaded
      );
      return;
    }

    this.loading = true;
    console.log(
      `📥 Cargando productos... Página: ${this.page}, Límite: ${this.limit}`
    );

    this.productService.getAllProductsPage(this.page, this.limit).subscribe({
      next: (data) => {
        const response = data as { content: IProduct[] };
        console.log('✅ Productos recibidos:' + response.content);

        if (response.content.length < this.limit) {
          this.allProductsLoaded = true;
          console.log('⏹ No hay más productos por cargar.');
        }

        this.products = [...this.products, ...response.content];
        this.page++;
      },
      error: (error) => {
        console.error('❌ Error al cargar productos:', error);
      },
      complete: () => {
        this.loading = false;
        console.log('✔ Carga completada');
      },
    });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 100 && !this.loading) {
      this.loadProducts();
    }
  }
  openeditModal(product: IProduct) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '400px',
      data: { product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._apiService.getAllProducts().subscribe((product) => {
          this.productList = product;
        });
      }
    });
  }

  openModal(product: any) {
    this.selectedProduct = product;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }

  delet(product: IProduct) {
    const confirmDelete = confirm(
      '¿Desea eliminar el producto: ' + product.name + '?'
    );
    if (confirmDelete) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          alert('Se ha eliminado correctamente');
          window.location.reload();
        },
        error(err) {
          console.error('Error al eliminar el producto', err);
          alert('Hubo un problema con la eliminación del producto');
        },
      });
    } else {
      alert('Eliminación cancelada');
    }
  }

  addToCart(quantity: number) {
    if (this.selectedProduct) {
      this.cartservice.setCartActive(true);

      if (isPlatformBrowser(this.platformId)) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const item = { ...this.selectedProduct, quantity };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  }
}
