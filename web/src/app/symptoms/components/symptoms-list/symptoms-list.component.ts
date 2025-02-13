import { Component } from '@angular/core';
import { Symptom } from '../../../models/symptom';
import { SymptomService } from '../../../services/symptom.service';
import { AlertService } from '../../../services/alert';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-symptoms-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './symptoms-list.component.html',
  styleUrl: './symptoms-list.component.scss',
})
export class SymptomsListComponent {
  symptoms: Symptom[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalSymptoms: number = 0;
  isLoading = true;

  constructor(
    private symptomService: SymptomService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSymptoms();
  }

  getSymptoms(): void {
    this.symptomService
      .getAllSymptoms(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.symptoms = response.data;
          this.totalPages = response.totalPages;
          this.totalSymptoms = response.titalItems;
        },
        error: (err) => {
          this.isLoading = false;
          this.alertService.error(
            'Error fetching symptoms: ' +
              (err.error?.message || 'Unknown error')
          );
        },
      });
  }

  deleteSymptom(id: string): void {
    this.symptomService.deleteSymptom(id).subscribe({
      next: () => {
        this.alertService.success('Successfully removed');
        this.getSymptoms();
      },
      error: (err) => {
        this.alertService.error(
          'Delete failed: ' + (err.error?.message || 'Unknown error')
        );
      },
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getSymptoms();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getSymptoms();
    }
  }

  newRegister() {
    this.router.navigate(['home', 'symptoms', 'new']);
  }

  editSymptom(id: string) {
    this.router.navigate(['home', 'symptoms', 'edit', id]);
  }
}
