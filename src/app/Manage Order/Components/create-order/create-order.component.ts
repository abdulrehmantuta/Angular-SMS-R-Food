import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  categories: string[] = ['All', 'Boti', "Puri Paratha Roll", "Chapati Roll", "Chinese Roll", 'Tikka', "Kabab", "Roti"];
  selectedCategory: string = 'All';

  constructor(
    private _ItemService: ItemService,
    private fb: FormBuilder,
    private _SaleService: SaleService,
    private _NzMessageService: NzMessageService,
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
      id: 0,
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
    this.quantityList = [];
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
        this.clearCart();
        localStorage.removeItem('SaleId');
        this.openReceiptWindow(res);
      });
    } else {
      this._SaleService.addSales(this.SaleForm.value).subscribe(res => {
        this.clearCart();
        this.openReceiptWindow(res);
        localStorage.removeItem('SaleId');
      }, error => {
        this._NzMessageService.error('Error creating bill!');
      });
    }
  }

  openReceiptWindow(SaleRes: Sale) {
    let itemsHtml = "";
    let totalAmount = 0;

    SaleRes.items.forEach((item, index) => {
      totalAmount += Number(item.amount);
      itemsHtml += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.itemName}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
        </tr>`;
    });

    const receiptHtml = `
      <html>
      <head>
          <title>Receipt</title>
          <style>
              body { font-family: Arial, sans-serif; text-align: center; }
              .receipt-container { width: 300px; margin: auto; border: 1px solid #000; padding: 10px; }
              h2 { font-size: 20px; font-weight: bold; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th, td { border: 1px solid black; padding: 5px; text-align: left; }
              .total { border-top: 2px solid black; font-weight: bold; }
              .footer { font-size: 12px; margin-top: 10px; }
          </style>
      </head>
      <body>
          <div class="receipt-container">
              <h2>Rashid-Bar-B-Q</h2>
              <p>KORANGI NO: 1, SECTOR 32-B, PLOTES-06 KARACHI.</p>
              <p>PHONE(S): 03160200002, 03160200002</p>

              <p><strong>Order No:</strong> ${SaleRes.invoiceNumber}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>

              <table>
                  <tr>
                      <th>Sr No</th>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Amount</th>
                  </tr>
                  ${itemsHtml}
                  <tr class="total">
                      <td colspan="3">Total</td>
                      <td>Rs: ${totalAmount}</td>
                  </tr>
              </table>

              <p class="footer">Thank You! Visit Again...</p>
              <p class="footer">Digital POS Management MasterSoft</p>
              <p class="footer">Created By A.R Tutal & Waqas Tutal</p>
              <p class="footer">Phone: 03151030772 & 03171187180</p>
          </div>

          <script>
              window.onload = function() {
                  setTimeout(() => {
                      window.print();
                      setTimeout(() => window.close(), 500);
                  }, 500);
              };
          </script>
      </body>
      </html>
    `;

    const receiptWindow = window.open('', '_blank', 'width=400,height=600');
    if (receiptWindow) {
      receiptWindow.document.open();
      receiptWindow.document.write(receiptHtml);
      receiptWindow.document.close();
      this._NzMessageService.success('Bill Created Successfully!');
    }
  }



  TotalAmountBill!: number;
  getTotalAmount(): number {
    return this.cart.reduce((total, item, index) => {
      this.TotalAmountBill = total + (Number(item.itemRate || item.price) * this.quantityList[index]);
      return this.TotalAmountBill;
    }, 0);
  }

  downloadSalesData() {
    this._SaleService.getSales().subscribe(res => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(res));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "SalesData.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
    });
  }
}