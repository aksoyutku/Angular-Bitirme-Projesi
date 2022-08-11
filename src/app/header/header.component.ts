import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  loggedIn = false;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) this.loggedIn = true;
  }
}
