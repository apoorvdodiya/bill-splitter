import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private autService: AuthService
  ) {}
  firstClick = false;

  ngOnInit(): void {}

  onFirstClick() {
    this.firstClick = true;
    setTimeout(() => {
      this.firstClick = false;
    }, 3000);
  }

  logout() {
    this.autService.logout();
  }

}
