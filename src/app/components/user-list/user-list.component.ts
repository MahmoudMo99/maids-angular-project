import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate(300)]),
    ]),
  ],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  page = 1;
  totalPages: number = 1;
  loading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUsers(this.page);
  }

  loadUsers(page: number) {
    this.loading = true;
    this.userService
      .getUsers(page)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          this.users = response.data;
          this.page = response.page;
          this.totalPages = response.total_pages;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.error('Failed to load users', error);
        }
      );
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadUsers(this.page);
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadUsers(this.page);
    }
  }

  isNextButtonDisabled(): boolean {
    return this.page >= this.totalPages;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
