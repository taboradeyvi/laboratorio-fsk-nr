import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SymptomService } from '../../../services/symptom.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert';
import { Symptom } from '../../../models/symptom';

@Component({
  selector: 'app-symptoms-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './symptoms-detail.component.html',
  styleUrl: './symptoms-detail.component.scss',
})
export class SymptomsDetailComponent implements OnInit {
  symptomForm!: FormGroup;
  symptomId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private symptomService: SymptomService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.symptomId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.symptomId;

    this.symptomForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (this.isEditMode) {
      this.loadSymptom();
    }
  }

  loadSymptom() {
    if (!this.symptomId) return;

    this.symptomService.getSymptomById(this.symptomId!).subscribe({
      next: (symptom: Symptom) => {
        this.symptomForm.patchValue({
          name: symptom.name,
          description: symptom.description,
        });
      },
      error: (err) => {
        this.alertService.error(
          'Error loading symptom: ' + (err.error?.message || 'Unknown error')
        );
      },
    });
  }

  saveSymptom() {
    if (this.symptomForm.invalid) return;

    const symptomData: Symptom = this.symptomForm.value;

    if (this.isEditMode) {
      this.symptomService
        .updateSymptom(this.symptomId!, symptomData)
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
      this.symptomService.createSymptom(symptomData).subscribe({
        next: () => {
          this.alertService.success('Successfully created');
          this.router.navigate(['/home/symptoms']);
        },
        error: (err) => {
          this.alertService.error(
            'Creation failed: ' + (err.error?.message || 'Unknown error')
          );
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/home/symptoms']);
  }
}
