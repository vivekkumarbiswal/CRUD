import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataModel } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/details';

  constructor(private http: HttpClient) { }

  getAll(): Observable<DataModel[]> {
    return this.http.get<DataModel[]>(this.apiUrl);
  }

  create(member: DataModel): Observable<DataModel> {
    return this.http.post<DataModel>(this.apiUrl, member);
  }

  update(id: number, member: DataModel): Observable<DataModel> {
    return this.http.put<DataModel>(`${this.apiUrl}/${id}`, member);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
