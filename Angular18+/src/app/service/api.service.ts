import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _http = inject(HttpClient);
  private urlBase: string =
    'https://striking-barely-anteater.ngrok-free.app/products';

  getAllProducts(): Observable<any> {
    return this._http.get<any[]>(this.urlBase);
  }
  postProduct(url: string, body: string) {
    return this._http.post(url, body);
  }
}
