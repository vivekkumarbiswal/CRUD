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
  form!: FormGroup;
  dataList: DataModel[] = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: [null, [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });

  }

  onSubmit() {
    const value = this.form.getRawValue();
    this.dataList = this.dataList.filter(item => item.id !== value.id);
    this.dataList.push(value);
    this.form.reset();
    this.form.get('id')?.enable();
  }

  onEdit(item: DataModel) {
    this.form.patchValue(item);
    this.form.get('id')?.disable();
  }

  onDelete(id: number) {
    this.dataList = this.dataList.filter(item => item.id !== id);
  }

  onClear() {
    this.form.reset();
    this.form.get('id')?.enable();
  }
}
