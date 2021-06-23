import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../classes/api-response';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = 'http://localhost:6060/api/v1/task';
  constructor(private httpClient: HttpClient) {}

  public getPage = (
    page: number,
    size: number,
    sort: string,
    order: string,
    filters: any
  ): Observable<ApiResponse> => {
    return this.httpClient.post<ApiResponse>(
      `${this.baseUrl}/page?page=${page}&size=${size}&sort=${sort}&order=${order}`,
      filters
    );
  };

  public create(taskDetails: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${this.baseUrl}`, taskDetails);
  }
}
