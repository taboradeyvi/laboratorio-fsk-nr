import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-detail.component.html',
  styleUrl: './users-detail.component.scss',
})
export class UsersDetailComponent implements OnInit {
  userForm!: FormGroup;
  userId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.userId;

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      role: ['user', Validators.required],
    });

    if (this.isEditMode) {
      this.loadUser();
    }
  }

  loadUser() {
    if (!this.userId) return;

    this.userService.getUserById(this.userId).subscribe({
      next: (user: User) => {
        this.userForm.patchValue(user);
      },
      error: (err) => {
        this.alertService.error(
          'Error loading user: ' + (err.error?.message || 'Unknown error')
        );
      },
    });
  }

  saveUser() {
    if (this.userForm.invalid) return;

    const userData: User = this.userForm.value;

    if (this.isEditMode) {
      this.userService.updateUser(this.userId!, userData).subscribe({
        next: () => {
          this.alertService.success('User successfully updated');
        },
        error: (err) => {
          this.alertService.error(
            'Update failed: ' + (err.error?.message || 'Unknown error')
          );
        },
      });
    } else {
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.alertService.success('User successfully created');
          this.router.navigate(['/home/users']);
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
    this.router.navigate(['/home/users']);
  }
}
