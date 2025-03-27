import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from 'src/app/Item/interface/item';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private apiUrl = 'http://localhost:5032/api/'; // Change port if needed

  constructor(private http: HttpClient) {}

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}Sales`);
  }

  addSales(requst: Sale): Observable<Sale> {
    return this.http.post<Sale>(`${this.apiUrl}Sales`, requst);
  }
  
  getSalesById(Id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}Sales/${Id}`);
  }

  updatedSales(requst: Sale, Id: number): Observable<Sale> {
    return this.http.put<Sale>(`${this.apiUrl}Sales/${Id}`, requst);
  }
}
