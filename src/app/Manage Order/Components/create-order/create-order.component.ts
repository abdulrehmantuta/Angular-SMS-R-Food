import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Item, Sale } from 'src/app/Item/interface/item';
import { ItemService } from 'src/app/Item/Servicres/item.service';
import { SaleService } from 'src/app/main-layout/Services/sale.service';
interface Items {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit{
  quantityList: number[] = [];
  ItemRes: Item[] = [];
  SaleForm!: FormGroup; 
  SaleRes!: Sale;
  cart: any[] = [];
  filteredItems: Item[] = [...this.ItemRes];
  categories: string[] = ['All', 'Boti', "Puri Paratha Roll", "Chapati Roll", "Chinese Roll", 'Tikka', "Kabab"];
  selectedCategory: string = 'All';

  constructor(
    private _ItemService: ItemService,
    private fb: FormBuilder,
    private _SaleService: SaleService,
  ) {}
    
  ngOnInit(): void {
    this.SaleFormGroup();
    this.onGet();
    let SaleId = Number(localStorage.getItem('SaleId'));
    if(SaleId){
      this._SaleService.getSalesById(SaleId).subscribe(res => {
        this.patchSaleForm(res);
        this.cart = res.items;
        res.items.forEach((item) => {
          this.addToCart(item)
        });
      });
    }
  }

  patchSaleForm(sale: any) {
    this.SaleForm.patchValue({
      invoiceNumber: sale.invoiceNumber,
      id: sale.id,
      saleDate: new Date(sale.saleDate),
      foodCenterName: sale.foodCenterName,
      foodCenterAddress: sale.foodCenterAddress
    });
  
    // ✅ FormArray ko update karna zaroori hai
    const itemsArray = this.SaleForm.get('Items') as FormArray;
    itemsArray.clear(); // ✅ Purane items delete karein
  
    sale.items.forEach((item: any) => {
      itemsArray.push(this.fb.group({
        id: item.id,
        saleId: item.saleId,
        itemName: item.itemName,
        price: item.price,
        quantity: item.quantity,
        amount: item.amount
      }));
    });
  }
  
  SaleFormGroup() {
    this.SaleForm = this.fb.group({
      invoiceNumber: '',
      id: null,
      saleDate: new Date(),
      foodCenterName: 'Bar B Q Food Center',
      foodCenterAddress: 'KORANGI NO: 1, SECTOR 32-B PLOTES-06 KARACHI. PHONE(S): 03160200002,',
      Items: this.fb.array([])  // ✅ FormArray initialized properly
    });
  }

  get Items(): FormArray {
    return this.SaleForm.get('Items') as FormArray;
  }

  onGet(){
    this._ItemService.getItems().subscribe(res => {
      this.ItemRes = res;
      this.quantityList = this.ItemRes.map(() => 1);
      this.filterItems('All');
    })
  }

  filterItems(category: string) {
    this.selectedCategory = category;
  
    if(category === "All"){
      this.filteredItems = this.ItemRes;
    } else {
      this.filteredItems = this.ItemRes.filter(item => {
        return item.categoryId === this.getCategoryId(category);
      });
    }
  }
  
  getCategoryId(category: string): number | null {
    const categoryMap: { [key: string]: number } = {
      "Boti": 18,
      "Puri Paratha Roll": 19,
      "Chapati Roll": 21,
      "Tikka": 22,
      "Roti": 23,
      "Chinese Roll": 24,
      "Kabab": 29
    };
    return categoryMap[category] || null;
  }

  increment(index: number) {
    this.quantityList[index]++;
  }
  
  decrement(index: number) {
    if (this.quantityList[index] > 1) {
      this.quantityList[index]--;
    } else {
      this.clear(index);
    }
  }
  
  clear(index: number) {
    this.cart.splice(index, 1);
    this.quantityList.splice(index, 1);
  }
  
  addToCart(item: any) {
    const existingItemIndex = this.cart.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      this.quantityList[existingItemIndex]++;
    } else {
      this.cart.push({ ...item });
      this.quantityList.push(1);
    }
  }
  
  clearCart() {
    this.cart = [];
    localStorage.removeItem('SaleId');
  }

  onSubmitBill() {
    this.Items.clear();
  
    this.cart.forEach((item, index) => {
      const quantity = this.quantityList[index];
      const amount = Number(item.itemRate || item.price) * quantity;
  
      this.Items.push(this.fb.group({
        itemName: [item.itemName],
        price: [item.itemRate || item.price],
        quantity: [quantity.toString()],
        amount: [amount.toString()],
      }));
    });
    const SaleId = Number(localStorage.getItem('SaleId'));
    if(SaleId){
      this._SaleService.updatedSales(this.SaleForm.value, SaleId).subscribe(res => {
        localStorage.removeItem('SaleId');
        this.openReceiptWindow(res);
      });
    } else {
      this._SaleService.addSales(this.SaleForm.value).subscribe(res => {
        this.openReceiptWindow(res);
        localStorage.removeItem('SaleId');
      });
    }
  }
  
  openReceiptWindow(SaleRes: Sale) {
    const receiptHtml = `
      <html>
      <head>
          <title>Receipt</title>
          <style>
              .receipt h2 {
                  text-align: center;
                  font-size: 30px;
                  font-weight: 900;
                  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
              }
              .receipt span {
                  text-align: center;
                  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
              }
              .receipt table tr {
                  border-top: 1px solid #000;
                  border-bottom: 1px solid #000;
                  font-size: 12px;
              }
              .receipt .first-row {
                  border-top: 1px solid #000;
                  font-size: 15px;
              }
              .receipt .second-row {
                  border-bottom: 1px solid #000;
                  font-size: 15px;
              }
          </style>
      </head>
      <body>
          <div class="row d-flex justify-content-start ms-4 receipt">
              <div class="col-4" style="border: 1px solid #000;">
                  <div>
                      <h2>Rashid-Bar-B-Q</h2>
                      <div class="d-flex justify-content-center">
                          <span>KORANGI NO: 1, SECTOR 32-B,</span>
                      </div>
                      <div class="d-flex justify-content-center">
                          <span>PLOTES-06 KARACHI.</span>
                      </div>
                      <div class="d-flex justify-content-center">
                          <span>PHONE(S): 03160200002, 03160200002.</span>
                      </div>
                      <div class="row first-row mt-3">
                          <div class="col-12">
                              <strong class="Font-Family">Invoice No:</strong>
                              <strong class="ms-2 Font-Family">000001</strong>
                          </div>
                      </div>
                      <div class="row second-row mb-3">
                          <div class="col-12">
                              <strong class="Font-Family">Date:</strong>
                              <strong class="ms-2 Font-Family">Sunday, March 23, 2025 / 1 am</strong>
                          </div>
                      </div>
                      <table style="width: 100%;">
                          <tr>
                              <th>Sr No</th>
                              <th>Item</th>
                              <th>Quantity</th>
                              <th>Amount</th>
                          </tr>
                          <tr>
                              <td>1</td>
                              <td>chicken malai boti</td>
                              <td>2</td>
                              <td>250</td>
                          </tr>
                          <tr>
                              <td>1</td>
                              <td>chicken malai boti</td>
                              <td>2</td>
                              <td>250</td>
                          </tr>
                          <tr>
                              <td>1</td>
                              <td>chicken malai boti</td>
                              <td>2</td>
                              <td>250</td>
                          </tr>
                          <tr>
                              <td>1</td>
                              <td>chicken malai boti</td>
                              <td>2</td>
                              <td>250</td>
                          </tr>
                      </table>
                      <div class="row mt-1">
                          <div class="col-12 d-flex justify-content-end">
                              <strong style="border-bottom: 2px solid #000;" class="Font-Family">Total</strong>
                              <strong style="border-bottom: 2px solid #000;" class="ms-2 Font-Family">Rs :1300</strong>
                          </div>
                      </div>
                      <div class="row first-row mt-1">
                          <div class="col-12 d-flex justify-content-center"> 
                              <strong class="Font-Family" style="font-size: 10px;">Thank You! Visit Again...</strong>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-12 d-flex justify-content-center"> 
                              <strong class="Font-Family" style="font-size: 10px;">A.R Tutal: Digital POS Management MasterSoft</strong>
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-12 d-flex justify-content-center"> 
                              <strong class="Font-Family" style="font-size: 10px;">Phone: 03151030772</strong>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <script>
              window.onload = function() {
                  window.print();
                  setTimeout(() => window.close(), 1000);
              }
          </script>
      </body>
      </html>
    `;
  
    const receiptWindow = window.open('', '_blank', 'width=400,height=600');
    if (receiptWindow) {
      receiptWindow.document.open();
      receiptWindow.document.write(receiptHtml);
      receiptWindow.document.close();
    }
  }

  getTotalAmount(): number {
    return this.cart.reduce((total, item, index) => {
      return total + (Number(item.itemRate || item.price) * this.quantityList[index]);
    }, 0);
  }
}