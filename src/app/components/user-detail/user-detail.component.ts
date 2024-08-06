import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User | undefined;
  loading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService
        .getUserById(Number(id))
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.user = data.data;
            this.loading = false;
          },
          (error) => {
            console.error('Failed to load user details', error);
            this.loading = false;
          }
        );
    } else {
      this.loading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
