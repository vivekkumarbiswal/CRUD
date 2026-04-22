import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DataModel {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //Angular simple CRUD using array methods  (realtime coding)

  constructor(private fb: FormBuilder) {}
  form!: FormGroup;
  dataList: DataModel[] = [];
  editId!: number;

  ngOnInit() {
    this.form = this.fb.group({
      id: [null, Validators.required],
      name: [''],
    });
    console.log(this.dataList);
  }
  OnAdd() {
    const value = this.form.value;
    this.dataList = this.dataList.filter((item) => item.id !== value.id);
    this.dataList.push(this.form.value);
    this.form.reset();
  }

  onEdit(item: DataModel) {
    this.form.setValue({ ...item });
  }

  onDelete(id: any) {
    this.dataList = this.dataList.filter((item) => item.id !== id);
  }
}
