import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from '../../Servicres/item.service';
import { ItemCategory } from '../../interface/item';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
  ItemForm!: FormGroup;
  ItemCategoryRes: ItemCategory[] = [];
  imagePreview: string | ArrayBuffer | null = null; // Image preview ke liye

  constructor(
    private fb: FormBuilder,
    private _ItemService: ItemService,
  ) {}

  ngOnInit(): void {
    this.ItemFormGroup();
    this.onGet();
  }

  ItemFormGroup() {
    this.ItemForm = this.fb.group({
      id: [0], // ID bhi include karein
      itemName: [''],
      itemRate: [''],
      itemDate: [''],
      categoryId: [0],
      category: this.fb.group({
        id: [0],
        name: ['']
      })
    });
  }

  onGet(){
    this._ItemService.getItemCategory().subscribe(res => {
      this.ItemCategoryRes = res
    });
  }
  onSave() {
    this._ItemService.addItem(this.ItemForm.value).subscribe(res => {
      const resp = res
    });
  }
}
