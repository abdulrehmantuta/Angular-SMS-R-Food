import { Component } from '@angular/core';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent {
  data = [
    {
      code: '000001',
      data: '30-03-2024',
    },
    {
      code: '000002',
      data: '30-03-2024',
    },
    {
      code: '000003',
      data: '30-03-2024',
    },
    {
      code: '000004',
      data: '30-03-2024',
    },
  ];
}