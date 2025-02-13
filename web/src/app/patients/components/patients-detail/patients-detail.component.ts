import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../models/patient';
import { PatientService } from '../../../services/patient.service';
import { AlertService } from '../../../services/alert';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patients-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patients-detail.component.html',
  styleUrl: './patients-detail.component.scss',
})
export class PatientsDetailComponent implements OnInit {
  patientForm!: FormGroup;
  patientId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
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
    this.patientService
      .getPatientById(this.patientId!)
      .subscribe((patient: Patient) => {
        this.patientForm.patchValue({
          firstName: patient.firstName,
          lastName: patient.lastName,
          address: patient.address,
          birthday: this.formatDate(patient.birthday),
        });

        this.setPhoneNumbers(patient.phoneNumbers || []);
        this.setEmails(patient.emails || []);
      });
  }

  private formatDate(isoDate: string): string {
    return isoDate ? isoDate.split('T')[0] : '';
  }

  setPhoneNumbers(phoneNumbers: string[]): void {
    const phoneArray = this.patientForm.get('phoneNumbers') as FormArray;
    phoneArray.clear();

    if (phoneNumbers && phoneNumbers.length > 0) {
      phoneNumbers.forEach((phone) => {
        phoneArray.push(this.fb.control(phone, Validators.required));
      });
    } else {
      phoneArray.push(this.fb.control('', Validators.required));
    }
  }

  setEmails(emails: string[]): void {
    const emailArray = this.patientForm.get('emails') as FormArray;
    emailArray.clear();

    if (emails && emails.length > 0) {
      emails.forEach((email) => {
        debugger;
        emailArray.push(
          this.fb.control(email, [Validators.required, Validators.email])
        );
      });
    } else {
      emailArray.push(
        this.fb.control('', [Validators.required, Validators.email])
      );
    }

    debugger;
  }

  savePatient() {
    if (this.patientForm.invalid) return;

    const patientData: Patient = this.patientForm.value;

    if (this.isEditMode) {
      this.patientService
        .updatePatient(this.patientId!, patientData)
        .subscribe({
          next: () => {
            this.alertService.success('Successfully updated');
            this.router.navigate(['/home/patients']);
          },
          error: (err) => {
            this.alertService.error(
              'Delete failed: ' + (err.error?.message || 'Unknown error')
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
            'Delete failed: ' + (err.error?.message || 'Unknown error')
          );
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/home/patients']);
  }
}
