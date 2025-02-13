import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { SymptomService } from '../../../services/symptom.service';
import { Symptom } from '../../../models/symptom';
import { AlertService } from '../../../services/alert';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patients-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patients-detail.component.html',
  styleUrls: ['./patients-detail.component.scss'],
})
export class PatientsDetailComponent implements OnInit {
  patientForm!: FormGroup;
  patientId: string | null = null;
  isEditMode = false;
  availableSymptoms: Symptom[] = [];
  currentPage = 1;
  totalSymptoms = 0;
  symptomsPerPage = 10;
  selectedSymptoms: string[] = [];
  patientSymptoms: Symptom[] = [];
  isModalOpen: boolean = false;
  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private symptomService: SymptomService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.patientId;

    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      phoneNumbers: this.fb.array([]),
      emails: this.fb.array([]),
      symptoms: this.fb.array([]),
    });

    if (this.isEditMode) {
      this.loadPatient();
    }
  }

  get phoneNumbers(): FormArray {
    return this.patientForm.get('phoneNumbers') as FormArray;
  }

  get emails(): FormArray {
    return this.patientForm.get('emails') as FormArray;
  }

  get symptoms(): FormArray {
    return this.patientForm.get('symptoms') as FormArray;
  }

  loadSymptoms(): void {
    this.symptomService.getAvailableSymptoms(this.patientId!).subscribe({
      next: (response: Symptom[]) => {
        this.availableSymptoms = response;
      },
      error: (err) => {
        this.alertService.error(
          'Error loading symptoms: ' + (err.error?.message || 'Unknown error')
        );
      },
    });
  }

  addPhoneNumber(): void {
    this.phoneNumbers.push(this.fb.control('', Validators.required));
  }

  removePhoneNumber(index: number): void {
    if (this.phoneNumbers.length > 1) {
      this.phoneNumbers.removeAt(index);
    }
  }

  addEmail(): void {
    this.emails.push(
      this.fb.control('', [Validators.required, Validators.email])
    );
  }

  removeEmail(index: number): void {
    if (this.emails.length > 1) {
      this.emails.removeAt(index);
    }
  }

  loadPatient() {
    this.patientService.getPatientById(this.patientId!).subscribe({
      next: (patient) => {
        this.patientForm.patchValue({
          firstName: patient.firstName,
          lastName: patient.lastName,
          address: patient.address,
          birthday: this.formatDate(patient.birthday),
        });

        this.setPhoneNumbers(patient.phoneNumbers || []);
        this.setEmails(patient.emails || []);
        this.patientSymptoms = patient.symptoms || [];
      },
      error: (err) => {
        this.alertService.error(
          'Error loading patient: ' + (err.error?.message || 'Unknown error')
        );
      },
    });
  }

  setPhoneNumbers(phoneNumbers: string[]): void {
    const phoneArray = this.patientForm.get('phoneNumbers') as FormArray;
    phoneArray.clear();

    phoneNumbers.forEach((phone) => {
      phoneArray.push(this.fb.control(phone, Validators.required));
    });
  }

  setEmails(emails: string[]): void {
    const emailArray = this.patientForm.get('emails') as FormArray;
    emailArray.clear();

    emails.forEach((email) => {
      emailArray.push(
        this.fb.control(email, [Validators.required, Validators.email])
      );
    });
  }

  setSymptoms(symptoms: string[]): void {
    const symptomsArray = this.patientForm.get('symptoms') as FormArray;
    symptomsArray.clear();

    symptoms.forEach((symptomId) => {
      symptomsArray.push(this.fb.control(symptomId, Validators.required));
    });
  }

  formatDate(isoDate: string): string {
    return isoDate ? isoDate.split('T')[0] : '';
  }

  savePatient() {
    if (this.patientForm.invalid) return;

    const patientData = this.patientForm.value;

    if (this.isEditMode) {
      this.patientService
        .updatePatient(this.patientId!, patientData)
        .subscribe({
          next: () => {
            this.alertService.success('Successfully updated');
          },
          error: (err) => {
            this.alertService.error(
              'Update failed: ' + (err.error?.message || 'Unknown error')
            );
          },
        });
    } else {
      this.patientService.createPatient(patientData).subscribe({
        next: () => {
          this.alertService.success('Successfully created');
          this.router.navigate(['/home/patients']);
        },
        error: (err) => {
          this.alertService.error(
            'Create failed: ' + (err.error?.message || 'Unknown error')
          );
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/home/patients']);
  }

  openSymptomModal(): void {
    this.isModalOpen = true;

    this.loadSymptoms();
  }

  onSymptomModalChange(symptomId: string, event: any): void {
    if (event.target.checked) {
      this.selectedSymptoms.push(symptomId);
    } else {
      this.selectedSymptoms = this.selectedSymptoms.filter(
        (id) => id !== symptomId
      );
    }
  }

  saveSymptoms(): void {
    if (this.patientId) {
      this.patientService
        .addSymptomsToPatient(this.patientId, this.selectedSymptoms)
        .subscribe({
          next: (updatedPatient) => {
            this.availableSymptoms = [];
            this.closeModal();
            this.alertService.success('Symptoms added successfully');
            this.loadPatient();
          },
          error: (err) => {
            this.alertService.error(
              'Failed to add symptoms: ' +
                (err.error?.message || 'Unknown error')
            );
          },
        });
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
