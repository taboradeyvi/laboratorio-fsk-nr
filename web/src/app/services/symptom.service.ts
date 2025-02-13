import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Symptom } from '../models/symptom';
import { BaseApiService } from './base-api.service';
import { PaginatedResponse } from '../models/paginated-response';

@Injectable({
  providedIn: 'root',
})
export class SymptomService {
  constructor(private apiService: BaseApiService) {}

  getAllSymptoms(
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse<Symptom>> {
    return this.apiService.get<PaginatedResponse<Symptom>>(
      `symptoms?page=${page}&limit=${limit}`,
      true
    );
  }

  getAvailableSymptoms(patientId: string): Observable<Symptom[]> {
    return this.apiService.get<Symptom[]>(
      `symptoms/${patientId}/available`,
      true
    );
  }

  getSymptomById(id: string): Observable<Symptom> {
    return this.apiService.get<Symptom>(`symptoms/${id}`, true);
  }

  createSymptom(symptom: Symptom): Observable<Symptom> {
    return this.apiService.post<Symptom>('symptoms', symptom, true);
  }

  updateSymptom(id: string, symptom: Symptom): Observable<Symptom> {
    return this.apiService.put<Symptom>(`symptoms/${id}`, symptom, true);
  }

  deleteSymptom(id: string): Observable<Symptom> {
    return this.apiService.delete<Symptom>(`symptoms/${id}`, true);
  }
}
