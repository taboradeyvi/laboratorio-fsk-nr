import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../models/patient';
import { PatientService } from '../../../services/patient.service';
import { AlertService } from '../../../services/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patients-list.component.html',
  styleUrl: './patients-list.component.scss',
})
export class PatientsListComponent implements OnInit {
  patients: Patient[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalPatients: number = 0;
  isLoading = true;

  constructor(
    private patientService: PatientService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService
      .getAllPatients(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.patients = response.data;
          this.totalPages = response.totalPages;
          this.totalPatients = response.titalItems;
        },
        error: (err) => {
          this.isLoading = false;
          this.alertService.error(
            'Error fetching patients: ' +
              (err.error?.message || 'Unknown error')
          );
        },
      });
  }

  deletePatient(id: string): void {
    this.patientService.deletePatient(id).subscribe({
      next: () => {
        this.alertService.success('Successfully removed');
        this.getPatients();
      },
      error: (err) => {
        this.alertService.error(
          'Delete failed: ' + (err.error?.message || 'Unknown error')
        );
      },
    });
  }

  // Métodos de paginación
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getPatients();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPatients();
    }
  }

  newRegister() {
    this.router.navigate(['home', 'patients', 'new']);
  }

  editPatient(id: string) {
    this.router.navigate(['home', 'patients', 'edit', id]);
  }
}
