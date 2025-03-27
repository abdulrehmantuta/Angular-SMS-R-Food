import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../Servicres/item.service';
import { Item } from '../../interface/item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit{
  ItemRes: Item[] = [];

  constructor(
    private _ItemService: ItemService,
  ) {}
    
  ngOnInit(): void {
    this.onGet();
  }

  onGet(){
    this._ItemService.getItems().subscribe(res => {
      this.ItemRes = res;
    })
  }
}