import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './api.service';

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
  isEditMode = false;

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: [null, [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.refreshList();
  }

  refreshList() {
    this.api.getAll().subscribe(res => {
      this.dataList = res;
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (this.isEditMode) {
      this.api.update(value.id, value).subscribe(() => {
        this.refreshList();
        this.onClear();
      });
    } else {
      const duplicate = this.dataList.find(item => item.id === value.id);
      if (duplicate) {
        alert('Error: This ID already exists in the database!');
        return;
      }

      this.api.create(value).subscribe(() => {
        this.refreshList();
        this.onClear();
      });
    }
  }

  onEdit(item: DataModel) {
    if (confirm(`Do you want to edit Member ID: ${item.id}?`)) {
      this.isEditMode = true;
      this.form.patchValue(item);
      this.form.get('id')?.disable();
    }
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to permanently delete this record?')) {
      this.api.delete(id).subscribe(() => {
        this.refreshList();
      });
    }
  }

  onClear() {
    this.isEditMode = false;
    this.form.reset();
    this.form.get('id')?.enable();
  }
}
