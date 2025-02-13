import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { BaseApiService } from './base-api.service';
import { PaginatedResponse } from '../models/paginated-response';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private apiService: BaseApiService) {}

  getAllPatients(
    page: number = 1,
    limit: number = 10
  ): Observable<PaginatedResponse<Patient>> {
    return this.apiService.get<PaginatedResponse<Patient>>(
      `patients?page=${page}&limit=${limit}`,
      true
    );
  }

  getPatientById(id: string): Observable<Patient> {
    return this.apiService.get<Patient>(`patients/${id}`, true);
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.apiService.post<Patient>('patients', patient, true);
  }

  updatePatient(id: string, patient: Patient): Observable<Patient> {
    return this.apiService.put<Patient>(`patients/${id}`, patient, true);
  }

  deletePatient(id: string): Observable<Patient> {
    return this.apiService.delete<Patient>(`patients/${id}`, true);
  }

  addSymptomsToPatient(id: string, symptoms: string[]): Observable<Patient> {
    return this.apiService.post<Patient>(
      `patients/${id}/symptoms`,
      { symptoms },
      true
    );
  }
}
