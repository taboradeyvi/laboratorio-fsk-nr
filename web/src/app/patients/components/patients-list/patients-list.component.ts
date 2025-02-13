import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../models/patient';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patients-list.component.html',
  styleUrl: './patients-list.component.scss',
})
export class PatientsListComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getAllPatients().subscribe((patients) => {
      this.patients = patients;
    });
  }

  deletePatient(id: string): void {
    this.patientService.deletePatient(id).subscribe(() => {
      this.getPatients(); // Re-fetch the list after deleting
    });
  }
}
