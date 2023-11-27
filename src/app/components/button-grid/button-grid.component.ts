import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-grid',
  templateUrl: './button-grid.component.html',
  styleUrls: ['./button-grid.component.scss']
})
export class ButtonGridComponent {
  constructor(private router: Router) { }
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

}

