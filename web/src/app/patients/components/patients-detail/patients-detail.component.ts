import { Component } from '@angular/core';
import { Patient } from '../../../models/patient';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-patients-detail',
  standalone: true,
  imports: [],
  templateUrl: './patients-detail.component.html',
  styleUrl: './patients-detail.component.scss',
})
export class PatientsDetailComponent {
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
