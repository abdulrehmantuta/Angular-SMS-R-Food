import { Injectable } from '@angular/core';
import { Item, ItemCategory } from '../interface/item';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:5032/api/'; // Change port if needed

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}Item`);
  }

  addItem(requst: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}Item`, requst);
  }

  getItemCategory(): Observable<ItemCategory[]> {
    return this.http.get<ItemCategory[]>(`${this.apiUrl}ItemCategory`);
  }

  addItemCategory(requst: ItemCategory): Observable<ItemCategory> {
    return this.http.post<ItemCategory>(`${this.apiUrl}ItemCategory`, requst);
  }
  private cartItems: Item[] = []; // ✅ Maintain cart items
  private cartSubject = new BehaviorSubject<Item[]>([]); // ✅ Correct BehaviorSubject type


  // ✅ Get cart as Observable
  getCart(): Observable<Item[]> {
    return this.cartSubject.asObservable();
  }

  // ✅ Add item to cart
  addToCart(requst: Item): void {
    this.cartItems.push({ ...requst }); // ✅ Add single item to array
    this.cartSubject.next([...this.cartItems]); // ✅ Emit updated cart
  }

  // ✅ Clear cart
  clearCart(): void {
    this.cartItems = []; // ✅ Reset cart
    this.cartSubject.next([]); // ✅ Emit empty cart
  }
}
