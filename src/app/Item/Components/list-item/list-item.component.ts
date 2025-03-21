import { Component } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {
  data = [
    {
      itemName: 'Item 1',
      itemRate: '10',
      data: '30-03-2024',
    },
    {
      itemName: 'Item 2',
      itemRate: '20',
      data: '30-03-2024',
    },
    {
      itemName: 'Item 3',
      itemRate: '40',
      data: '30-03-2024',
    },
    {
      itemName: 'Item 4',
      itemRate: '100',
      data: '30-03-2024',
    },
    {
      itemName: 'Item 5',
      itemRate: '350',
      data: '30-03-2024',
    },
    {
      itemName: 'Item 6',
      itemRate: '450',
      data: '30-03-2024',
    },
  ];
}