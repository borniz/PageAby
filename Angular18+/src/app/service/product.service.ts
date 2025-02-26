import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/enviroment';
import { IProduct } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/product`;
  private headers = new HttpHeaders({ 'ngrok-skip-browser-warning': 'true' });
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl, { headers: this.headers });
  }

  getAllProductsPage(page: number, limit: number) {
    return this.http.get(`${this.apiUrl}/page?page=${page}&limit=${limit}`, {
      headers: this.headers,
    });
  }

  getByIdProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`, {
      headers: this.headers,
    });
  }

  createProduct(product: Omit<IProduct, 'id' | 'img'>): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl, product, {
      headers: this.headers,
    });
  }

  updateProduct(id: string, product: Partial<IProduct>): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apiUrl}/${id}`, product, {
      headers: this.headers,
    });
  }

  uploadImage(file: File, productId: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(
      `${this.apiUrl}/${productId}/upload-image`,
      formData,
      { headers: this.headers }
    );
  }

  deleteProduct(id: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.headers,
      responseType: 'text',
    });
  }
}
