export interface Item {
    id?: number;
    categoryId?: number;
    itemName: string;
    itemRate: string;
    itemDate: string;
  }

export interface Sale {
  id: number | 0;
  invoiceNumber: string;
  saleDate: string;
  foodCenterName: string;
  foodCenterAddress: string;
  items: items[];
}

export interface items{
  id?: number;
  itemName: string;
  price: string;
  quantity: string;
  amount: string;
}

export interface ItemCategory{
  id?: number;
  name: string;
}