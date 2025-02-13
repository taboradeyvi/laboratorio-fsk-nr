import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalUsers: number = 0;
  isLoading = true;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.users = response.data;
        debugger;
        this.totalPages = response.totalPages;
        this.totalUsers = response.totalItems;
        debugger;
      },
      error: (err) => {
        this.isLoading = false;
        this.alertService.error(
          'Error fetching users: ' + (err.error?.message || 'Unknown error')
        );
      },
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.alertService.success('User successfully removed');
        this.getUsers();
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
      this.getUsers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUsers();
    }
  }

  newRegister() {
    this.router.navigate(['home', 'users', 'new']);
  }

  editUser(id: string) {
    this.router.navigate(['home', 'users', 'edit', id]);
  }
}
