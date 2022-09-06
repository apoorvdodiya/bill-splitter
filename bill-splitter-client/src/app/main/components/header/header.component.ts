import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private autService: AuthService) {}
  firstClick = false;

  ngOnInit(): void {}

  onFirstClick() {
    this.firstClick = true;
    setTimeout(() => {
      this.firstClick = false;
    }, 3000);
  }

  logout() {
    Swal.fire({
      title: 'Are you sure you want to logout',
      icon: 'warning',
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) this.autService.logout();
    });
  }
}
