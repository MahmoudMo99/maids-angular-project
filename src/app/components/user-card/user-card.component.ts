import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  animations: [
    trigger('slideIn', [
      state('void', style({ transform: 'translateX(-100%)' })),
      transition(':enter', [animate('300ms ease-out')]),
    ]),
  ],
})
export class UserCardComponent {
  @Input() user: any;
  constructor(private router: Router) {}

  navigateToDetail(): void {
    this.router.navigate([`/user/${this.user.id}`]);
  }
}
